    /*eslint-env node*/

    //------------------------------------------------------------------------------
    // node.js starter application for Bluemix
    //------------------------------------------------------------------------------

    // This application uses express as its web server
    // for more info, see: http://expressjs.com
    var express = require('express');
    var pg = require('pg');

    //var sqlCredential = require('./sqlCred.js');


    var conString = "postgres://fvetluzo:ej3cURbi-96Ohta3Fpg2CSf-zQyVJ4a6@jumbo.db.elephantsql.com:5432/fvetluzo";
 
    //connection.connect("db2://user08356:gHjONBSEsHLG@75.126.155.153:50000/SQLDB")

    var client = new pg.Client(conString);
    client.connect(function(err) {
    if(err) {
        return console.error('could not connect to postgres', err);
    }  
    });

    // cfenv provides access to your Cloud Foundry environment
    // for more info, see: https://www.npmjs.com/package/cfenv
    //var cfenv = require('cfenv');

    // create a new express server
    var app = express();

    
    // serve the files out of ./public as our main files
    app.use(express.static(__dirname + '/public'));

    // get the app environment from Cloud Foundry
    //var appEnv = cfenv.getAppEnv();
    app.listen(3000);


    // start server on the specified port and binding host
    //app.listen(appEnv.port, function() {
    //
    //	// print a message when the server starts listening
    //  console.log("server starting on " + appEnv.url);
    //});
