var fs = require("fs");
var process = require("process");
const { GetMsBuildParams } = require("./Utils/MsbuildHelper");
const { RunProcesses} = require("./Utils/ProcessesHelper");
const { MoveBuiltApk,PatchFiles }  = require("./Utils/BuildHelper");
const { clear } = require("console");

if (!fs.existsSync("./config.json")) {
  console.log("No configuration file detected");
  return;
}
var config = JSON.parse(fs.readFileSync("./config.json"));
var callStack = [];
for (let project of config.projects) {
  callStack.push({
    command: `${GetMsBuildParams(
      config,
      project
    )}`,
    onBeforeCall: function(){
         PatchFiles(project);
    },
    callBack: function () {
      MoveBuiltApk(config,project);
    },
  });
}
RunProcesses(callStack);
