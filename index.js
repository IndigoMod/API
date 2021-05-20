const http = require('http');
const printlib = require('printlib');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { parse } = require('querystring');
const fs = require('fs');
var KeepAliveAgent = require('keep-alive-agent'),
  KeepAliveAgent = require('keep-alive-agent');

let sectimer = 0;

const server = http.createServer((req, res) => {
  printlib.printWarn("Client connected to API.");
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const reqparse = JSON.parse(body);
        if (reqparse.method == "online") {
          res.end(buildJSON('"valid":"true","online":"true"'))
        }
        else {
          res.end(buildJSON('"valid":"false","err":"unknown-command"'));
        }
        res.end(buildJSON('"valid":"true"'));
      }
      catch (e) {
        res.end(buildJSON('"valid":"false","err":"' + e + '"'));
      }
    });
  }
  else {
    fs.readFile('badmethod.html', 'utf8', function(err, data) {
      if (err) throw err;
      res.end(data.replace("__method$$", req.method));
    });
  }
});

var keepaliveOpt = {
    hostname: 'api.studiouifxdesig.repl.co',
    port: 8080,
    path: '/',
    agent: new KeepAliveAgent(),
};

function buildJSON(content) {
  return '{"text-type":"json",' + content + '}';
}

printlib.printInfo("Running API.");
server.listen(8080);
http.get(keepaliveOpt, function(response) { printlib.printInfo("Keep alive ping."); });