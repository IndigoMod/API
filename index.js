const http = require('http');
const printlib = require('printlib');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { parse } = require('querystring');
const fs = require('fs');
var KeepAliveAgent = require('keep-alive-agent'),
  KeepAliveAgent = require('keep-alive-agent');

let sectimer = 0;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const reqparse = JSON.parse(body);
        if (reqparse.method == "online") {
          res.end(printlib.buildJSON(`"valid":"true","online":"true"`))
        }
        if (reqparse.method == "ip") {
          const forwarded = req.headers['x-forwarded-for'];
          const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
          res.end(printlib.buildJSON(`"valid":"true","ip":"` + ip + `"`))
        }
        else {
          res.end(printlib.buildJSON(`"valid":"false","err":"unknown-command"`));
        }
        res.end(printlib.buildJSON(`"valid":"true"`));
      }
      catch (e) {
        res.end(printlib.buildJSON(`"valid":"false","err":"` + e + `"`));
        printlib.printError("Client made the API throw an err: " + e + ".");
      }
    });
  }
  else {
    printlib.printError("Client connected with invalid method.");
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

printlib.printInfo("Running API.");
server.listen(8080);
http.get(keepaliveOpt, function(response) { printlib.printInfo("Keep alive ping."); });