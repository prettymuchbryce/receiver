var GITHUB_IPS = 
  ["204.232.175.64", 
  "204.232.175.27", 
  "192.30.252.0", 
  "192.30.252.22"];

var config = require(__dirname + '/config.json');
var express = require('express');
var app = express();
var port = config.port;
var exec = require('child_process').exec;
var command = constructCommand();

app.post(config.endpoint, function(req, res) {

  if (GITHUB_IPS.indexOf(req.connection.remoteAddress) == -1) {
    console.log("Bad IP");
    return;
  }

  console.log("Receiving push. Hut.. Hut.. Hike!");
  child = exec(command, function (error, stdout, stderr) {
    console.log(stdout);
  });
  res.end("200 OK");
});

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(app.router);
});

app.listen(port);
console.log("Waiting for git push..");

function constructCommand() {
  var command = "";

  for (var i = 0; i < config.directoriesToPull.length; i++) {
    command += "cd " + config.directoriesToPull[i] + " && ";
  }

  command += "git pull && ";

  for (var j = 0; j < config.commandsToRunAfterPull.length; j++) {
    command += config.commandsToRunAfterPull[j];
    if (j != config.commandsToRunAfterPull.length-1) {
      command += " && ";
    }
  }
  return command;
}