const chalk = require('chalk');

exports.printInfo = function(msg) {
  console.log(chalk.blue("[INF] ") + "> " + msg);
}

exports.printWarn = function(msg) {
  console.log(chalk.yellow("[WRN] ") + "> " + msg);
}

exports.printError = function(msg) {
  console.log(chalk.red("[ERR] ") + "> " + msg);
}

exports.buildJSON = function(content) {
  return `{"text-type":"json",` + content + `}`;
}