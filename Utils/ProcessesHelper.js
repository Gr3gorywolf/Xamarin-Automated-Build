const { exec } = require("child_process");
var callStack = [];

function RunProcesses(calls) {
  callStack = calls;
  if (callStack.length > 0) {
    RunProcess(callStack[0]);
  }
}

function RunProcess(toRun) {
  if (toRun == null) {
    return;
  }
  toRun.onBeforeCall();
  let process = exec(toRun.command);
  process.stdout.on("data", function (data) {
    console.log(data);
  });
  process.stdout.on("end", function () {
    toRun.callBack();
    var nextProcess = NextProcess();
    if (nextProcess != null) {
      RunProcess(nextProcess);
    }
  });
}

function NextProcess() {
  callStack.splice(0, 1);
  if (callStack.length > 0) {
    return callStack[0];
  } else {
    return null;
  }
}

module.exports = { RunProcesses };
