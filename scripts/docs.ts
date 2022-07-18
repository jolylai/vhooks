import path from "path";
import { globby, fs } from "zx";

(async () => {
  const files = await globby(["*/*index.js"], {
    cwd: path.join(process.cwd(), "src"),
    absolute: true,
    // expandDirectories: {
    //   extensions: [".d.ts", ".js.map", ".js"],
    // },
    // onlyDirectories: true,
  });

  console.log("files: ", files);
  for (const file of files) {
    console.log("file: ", file);
    // fs.removeSync(file);
    // const dest = file.replace("/hooks", "/docs/hooks");
    // console.log("dest: ", dest);
    // fs.moveSync(file, dest);
    fs.removeSync(file);
  }
})();
