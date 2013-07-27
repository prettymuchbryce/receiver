var rangeCheck = require('range_check');
var config = require(__dirname + '/config.json');
var express = require('express');
var app = express();
var port = config.port;
var exec = require('child_process').exec;
var command = constructCommand();
var commandToRunWhenFinished = constructDoneCommand();
var request = require('request');

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(app.router);
});

//Get github hook ips
request('https://api.github.com/meta', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var json = JSON.parse(body);
    listen(json.hooks);
  }
});

//start listening
function listen(hooks) {
    app.post(config.endpoint, function(req, res) {
    if (!rangeCheck.in_range(req.connection.remoteAddress, hooks)) {
      res.end("500 Bad Request");
      return;
    }

    console.log("Receiving push. Hut.. Hut.. Hike!");
    child = exec(command, function (error, stdout, stderr) {
      console.log("Touchdown!");
      exec(commandToRunWhenFinished);
    });
    res.end("200 OK");
  });

  app.listen(port);
  console.log("Waiting for git push..");
}

function constructCommand() {
  var command = "";

  for (var i = 0; i < config.directoriesToPull.length; i++) {
    command += "cd " + config.directoriesToPull[i] + " && git pull && ";
    for (var j = 0; j < config.commandsToRunAfterPull.length; j++) {
      command += config.commandsToRunAfterPull[j] + " && ";
    }
  }

  command += "echo done";

  return command;
}

function constructDoneCommand() {
  for (var j = 0; j < config.commandsToRunWhenFinished.length; j++) {
    commandToRunWhenFinished += config.commandsToRunWhenFinished[j];
    if (j != config.commandsToRunWhenFinished.length-1) {
      commandToRunWhenFinished += " && ";
    }
  }
}