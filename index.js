const http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { parse } = require('querystring');
const fs = require('fs');
const server = http.createServer((req, res) => {
    console.log("Client connected to API.");
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
            console.log("Request made to API with valid request method.");
            try {
              const reqparse = JSON.parse(body);
              if (reqparse.method === "validate") {
                res.end(buildJSON('"valid":"true"'));
              }
              else if (reqparse.method === "doc") {
                res.end(buildJSON('documentation-url":"https://github.com/IndigoMod/API/blob/master/README.md"}'));
              }
              console.log("-- Request made to API with valid request content.");
            }
            catch(e) {
              console.log("-- Request made to API with invalid request content.");
              res.end(buildJSON('"valid":"false", "err":"' + e + '"'));
            }
            console.log("---- Request processing finished.");
        });
    }
    else {
      fs.readFile('badmethod.html', 'utf8', function(err, data) {
      if (err) throw err;
        res.end(data.replace("__method", req.method));
      });
    }
});

server.listen(8080);

function buildJSON(content) {
  return '{"text-type":"json", ' + content + '}';
}

console.log("Running API.");