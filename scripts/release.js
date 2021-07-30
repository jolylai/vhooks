const semver = require("semver");
const { prompt } = require("enquirer");
const path = require("path");
const args = require("minimist")(process.argv.slice(2));
const execa = require("execa");
const chalk = require("chalk");
const isDryRun = args.dry;

const step = msg => console.log(chalk.cyan(msg));
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: "inherit", ...opts });
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(" ")}`), opts);
const runIfNotDry = isDryRun ? dryRun : run;

const currentVersion = require("../package.json").version;
const preId =
  args.preid ||
  (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0]);

const inc = i => semver.inc(currentVersion, i, preId);

const versionIncrements = [
  "patch",
  "minor",
  "major",
  ...(preId ? ["prepatch", "preminor", "premajor", "prerelease"] : [])
];

(async function main() {
  let targetVersion = args._[0];
  const { release } = await prompt({
    type: "select",
    name: "release",
    message: "Select release type",
    choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(["custom"])
  });

  if (release === "custom") {
    targetVersion = (
      await prompt({
        type: "input",
        name: "version",
        message: "Input custom version",
        initial: currentVersion
      })
    ).version;
  } else {
    targetVersion = release.match(/\((.*)\)/)[1];
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`);
  }

  const { yes } = await prompt({
    type: "confirm",
    name: "yes",
    message: `Releasing v${targetVersion}. Confirm?`
  });

  if (!yes) {
    return;
  }

  step("\nRunning tests...");
  await runIfNotDry("yarn", ["test"]);

  step("\nBuilding usevhooks...");
  await runIfNotDry("yarn", ["build"]);

  step("\nGenerate changelog...");
  await runIfNotDry(`yarn`, ["changelog"]);

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
