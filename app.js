    /*eslint-env node*/

    //------------------------------------------------------------------------------
    // node.js starter application for Bluemix
    //------------------------------------------------------------------------------

    // This application uses express as its web server
    // for more info, see: http://expressjs.com
    var express = require('express');
    var pg = require('pg');
    var stormpath = require('express-stormpath');

    var mongojs = require('mongojs')
    
    var db = mongojs("var db = mongojs('username:password@example.com/mydb", ['Requests']);

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


    app.get('/path', function(req, res) {
    var is_ajax_request = req.xhr;
    console.log("ajax test");
        res.send("send compelte");
    });

    // start server on the specified port and binding host
    //app.listen(appEnv.port, function() {
    //
    //	// print a message when the server starts listening
    //  console.log("server starting on " + appEnv.url);
    //});
