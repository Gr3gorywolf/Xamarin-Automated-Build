var fs = require("fs");

function MoveBuiltApk(config, project) {
  var buildDir = `${config.outputPath}/${project.outputName}`;
  let apkFile = "";
  fs.readdirSync(buildDir).forEach((file) => {
    if (file.endsWith("Signed.apk")) {
      apkFile = file;
    }
  });
  var apkDir = "./dist";
  if (config.apkDir !== undefined && config.apkDir !== "") {
    apkDir = config.apkDir;
  }
  try {
    fs.mkdirSync(apkDir);
    dist = fs.copyFileSync(
      `${buildDir}/${apkFile}`,
      `${apkDir}/${project.outputName}.apk`
    );
  } catch (ex) {}
}

function PatchFiles(project) {
  if (project.patchFiles != undefined && project.patchFiles != null) {
    for (let patch of project.patchFiles) {
      if (patch.from !== undefined && patch.to !== undefined) {
        if (fs.existsSync(patch.from) && fs.existsSync(patch.to)) {
          fs.copyFileSync(patch.from, patch.to);
        }
      }
    }
  }
}

module.exports = { MoveBuiltApk, PatchFiles };
