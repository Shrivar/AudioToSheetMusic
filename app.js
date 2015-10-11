	var pg = require('pg');
	var url = require('url');
	var ejs = require('ejs');
	var express = require('express');
	var mongojs = require('mongojs');
	var ObjectId = require('mongojs').ObjectId;
	var stormpath = require('express-stormpath');
	var querystring = require('querystring');
    var multer  = require('multer')
    var upload = multer({ dest: 'uploads/'});
    var fs = require('fs');
	
	var db = mongojs("mongodb://portal:portal1@ds035674.mongolab.com:35674/hackathondb", ['Requests'], { authMechanism : 'ScramSHA1'});
	var db2 = mongojs("mongodb://portal:portal1@ds035674.mongolab.com:35674/hackathondb", ['Submissions'], { authMechanism : 'ScramSHA1'});

	// cfenv provides access to your Cloud Foundry environment
	// for more info, see: https://www.npmjs.com/package/cfenv
	//var cfenv = require('cfenv');

	var app = express();

	app.use(express.static(__dirname + '/views'));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');

//	app.use(stormpath.init(app, {
//		website: true,
//		applicationhref: "https://api.stormpath.com/v1/applications/1Of8X2O9jVwDvYHTFXMxWV",
//		apiKeyFile: __dirname + "/apiKey.properties"
	//}));

	//app.on('stormpath.ready', function() {
		app.listen(3000);
	//});

	app.post('/login', function(req, res){

		var parsedURL = url.parse(req.url);
		var data = querystring.parse(parsedURL.query);

		var username = data['username'];
		var password = data['password'];

		stormApp.authenticateAccount({
			username: username,
			password: password,
		}, function (err, result) {
			if (err) throw err;
			account = result.account;

		});

	});

	app.get('/account', function(req, res){
		if(req.user){
			res.render('account', { user: req.user });
			res.end();
		} else {
			res.redirect('/login');
		}
	});

	app.get('/', function(req, res){
		res.render('index');
		res.end();
	});

	app.get('/request', function(req, res) {

		var parsedURL = url.parse(req.url);
		var data = querystring.parse(parsedURL.query);

		db.Requests.find( { "_id" : ObjectId(data["id"]) } , function(err, docs) {

			if(err){

				console.log(err);
				res.write("Error.");
				res.end();

			} else {

				if(docs){

					res.render('request', { request : docs });
					res.end();

				} else {

					res.write("Error.");
					res.end();

				}

			}

		});

	});

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

	app.get('/submissions', function(req, res){

		var parsedURL = url.parse(req.url);
		var data = querystring.parse(parsedURL.query);
	
		db2.Submissions.findOne( { name : data["name"] }, function(err, doc){            
			
			var pdf = new Buffer(doc.data, "base64");

			res.set({
				'Content-Type': 'application/pdf',
			});
			
			res.send(pdf);
		});

	});

	app.get('/submissions/melody/reqid', function(req, res){

		var parsedURL = url.parse(req.url);
		var data = querystring.parse(parsedURL.query);
		
		db2.Submissions.find( { reqid : data["reqid"] , type : "melody" }, function(err, docs){ 

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

	app.get('/submissions/arrangement/reqid', function(req, res){

		var parsedURL = url.parse(req.url);
		var data = querystring.parse(parsedURL.query);
		
		db2.Submissions.find( { reqid : data["reqid"] , type : "arrangement" }, function(err, docs){ 

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

    app.post('/uploadPDF',upload.single('score'), function(req, res, next) {
        fs.readFile(__dirname + "\\" + req.file.path , "base64", function read(err, data) {
        if (err) {
        throw err;
            
        }
        db2.Submissions.insert(
            { name: req.file.originalname ,data, category: req.body.category}, function(err, doc) {

          if(err)
            console.log(err)
        
  	     });  
	  	
            res.redirect("/");
        });
        
    

});