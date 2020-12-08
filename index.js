var fs = require("fs");
var process = require("process");
const { GetMsBuildParams } = require("./Utils/MsbuildHelper");
const { RunProcesses} = require("./Utils/ProcessesHelper");
const { MoveBuiltApk,PatchFiles }  = require("./Utils/BuildHelper");
const { clear } = require("console");
const ora = require('ora');
let loader = ora('Initializing...').start();
let log = "";
loader.color ="blue";
if (!fs.existsSync("./config.json")) {
  console.log("No configuration file detected");
  return;
}
var config = JSON.parse(fs.readFileSync("./config.json"));
var callStack = [];
for (let project of config.projects) {
  let processToRun = {
    command: `${GetMsBuildParams(
      config,
      project
    )}`,
    onLog:function(logData){
     log+= logData;
     loader.text = `${ log.slice(log.length-1500,log.length).padEnd(1500,' ')}\n\n`;
    },
    onBeforeCall: function(){
         loader.prefixText = `building:${project.outputName}\n\n`;
         PatchFiles(project);
    },
    callBack: function () { 
      if(project.mustSignApk == true){
        MoveBuiltApk(config,project);
      }
    },
  };
  callStack.push(processToRun);
}
RunProcesses(callStack);
