var http = require('http');
var utilities = require('./utilities.js');

var actions = {
    'POST': function(request, response, body) {
        
            var options = {
                hostname: 'prod-22.canadaeast.logic.azure.com',
                port: 80,
                path: '/workflows/83be6bafd8cb40d1a96e2167fcf342e2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZAE9stwcP4eqAHuEcF6xrhIugPDUKKTQhDr6qrHRhW4',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
              };
        
            var req = http.request(options, function(res) {
                console.log('Status: ' + res.statusCode);
                console.log('Headers: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (innerBody) {
                    
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.end(innerBody);

                });
              });
            req.on('error', function(e) {
              console.log('problem with request: ' + e.message);
            });
            // write data to request body
        
            console.log(body);
            req.end(body);
        
          }
};

module.exports = function(request, response, body) {
  var action = actions[request.method];
  if (action) action(request, response, body);
  else utilities.sendResponse(response, 'Not Found', 404);
};