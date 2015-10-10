    var pg = require('pg');
    var url = require('url');
    var express = require('express');
    var mongojs = require('mongojs');
    var querystring = require('querystring');
    var stormpath = require('express-stormpath');
    
    var db = mongojs("mongodb://portal:portal1@ds035674.mongolab.com:35674/hackathondb", ['Requests'], { authMechanism : 'ScramSHA1'});

    // cfenv provides access to your Cloud Foundry environment
    // for more info, see: https://www.npmjs.com/package/cfenv
    //var cfenv = require('cfenv');

    // create a new express server
    var app = express();

//    var stormpathMiddleware = stormpath.init(app, {
//      apiKeyFile: '/Users/shriv/Documents/Hackathon/HackathonAppTranscriber/apiKey.properties',
//      application: 'https://api.stormpath.com/v1/accounts/2etgaz8j8E9PqBRAUXEYo2',
//      secretKey: 'T2NVglGDiABcKWEwGlUz',
//      expandCustomData: true,
//      enableForgotPassword: true
//    });

    // serve the files out of ./public as our main files
    app.use(express.static(__dirname + '/public'));

    


    // get the app environment from Cloud Foundry
    //var appEnv = cfenv.getAppEnv();
    //app.on('stormpath.ready', function() {
        app.listen(3000);
    //});


    app.get('/request/genre', function(req, res) {

        var parsedURL = url.parse(req.url);
        var data = querystring.parse(parsedURL.query);

        db.Requests.find( { "genre" : data["genre"] } , function(err, docs) {

            if(err){

                console.log(err);
                res.write("Error.");
                res.end();

            } else {

                res.write(JSON.stringify(docs));
                res.end();

            }

        });

    });

    app.get('/request/all', function(req, res) {

        db.Requests.find( {} , function(err, docs) {

            if(err){

                console.log(err);
                res.write("Error.");
                res.end();

            } else {

                res.write(JSON.stringify(docs));
                res.end();

            }

        });

    });

    // start server on the specified port and binding host
    //app.listen(appEnv.port, function() {
    //
    //	// print a message when the server starts listening
    //  console.log("server starting on " + appEnv.url);
    //});
