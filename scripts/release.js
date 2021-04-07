const { prompt } = require("enquirer");
const path = require("path");
const args = require("minimist")(process.argv.slice(2));
const targetVersion = args.v;
const execa = require("execa");
const chalk = require("chalk");
const isDryRun = args.dry;

const step = msg => console.log(chalk.cyan(msg));
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: "inherit", ...opts });
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(" ")}`), opts);
const runIfNotDry = isDryRun ? dryRun : run;

(async function main() {
  const { yes } = await prompt({
    type: "confirm",
    name: "yes",
    message: `Releasing v${targetVersion}. Confirm?`
  });

  if (!yes) return;

  // step("\nRunning tests...");
  // await run("yarn", ["test"]);

  step("\nBuilding usevhooks...");
  await run("yarn", ["build"]);

  const { stdout } = await run("git", ["diff"], { stdio: "pipe" });
  if (stdout) {
    step("\nCommitting changes...");
    await runIfNotDry("git", ["add", "-A"]);
    await runIfNotDry("git", ["commit", "-m", `release: v${targetVersion}`]);
  } else {
    console.log("No changes to commit.");
  }

  step("\nPublishing usevhooks package...");

  await runIfNotDry(
    "yarn",
    [
      "publish",
      "--new-version",
      targetVersion,
      "--registry",
      "https://registry.npmjs.org",
      "--access",
      "public"
    ],
    {
      cwd: path.resolve(__dirname, ".."),
      stdio: "pipe"
    }
  );

  step("\nPushing to GitHub...");
  await runIfNotDry("git", ["tag", `v${targetVersion}`]);
  await runIfNotDry("git", [
    "push",
    "origin",
    `refs/tags/v${targetVersion}`,
    "--no-verify"
  ]);
  await runIfNotDry("git", ["push", "origin", "master", "--no-verify"]);

  console.log();
  console.log(chalk.green(`Successfully published v${targetVersion}`));
})();
