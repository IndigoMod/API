const http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { parse } = require('querystring');
const fs = require('fs');

const server = http.createServer((req, res) => {
  /// Creates the server/allows HTTP connections
    console.log("Client connected to API.");
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          /// Event when data is received from a user.
          body += chunk.toString();
        });
        req.on('end', () => {
            /// Event when ALL data is received from a user.
            console.log("Request made to API with valid request method.");
            try {
              const reqparse = JSON.parse(body);
              /// Decodes the data from user into JSON, which lets us access things from the JSON such as properties (eg reqparse.item
              if (reqparse.sendbody === "true") {
                console.log("-- Request made to API with valid and parsable request content (" + body + ").");
              }
              else {
                console.log("-- Request made to API with valid and parsable request content.");
              }
              res.end(buildJSON('"valid":"true"'));
            }
            catch(e) {
              console.log("-- Request made to API with invalid request content.");
              res.end(buildJSON('"valid":"false", "err":"' + e + '"'));
            }
            console.log("---- Request processing finished.");
        });
    }
    else {
      /// When the user uses a bad or unsupported method.
      fs.readFile('badmethod.html', 'utf8', function(err, data) {
      if (err) throw err;
        res.end(data.replace("__method", req.method));
      });
    }
});

server.listen(8080);
/// The server is listening for connections from users.

function buildJSON(content) {
  return '{"text-type":"json", ' + content + '}';
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

console.log("Running API.");

