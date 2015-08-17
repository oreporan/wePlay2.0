// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var usersEndpoint = require('./endpoints/usersEndpoint');
var users = require('./controllers/users');
var leagues = require('./endpoints/leagues');
var db = require('./db').connect();
var bodyParser = require('body-parser');
var messageBuilder = require('./messages');
var constants = require('./Constants');
var config = require('./config');
// Init the logger
var logger = require('./logger');

// Since server has just started - we create a new logger file
logger.initFile();
logger = logger.init('server');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// This route is used to login, we don't want the filter to authenticate this path so we place it above the filter
// router.route(constants.PATH_AUTHENTICATE)
// 	.post(config.authenticateUser);

// middleware to use for all requests
router.use(function(req, res, next) {
	logger.audit('use' , req.method + '. New Request from: ' + req.hostname + ' routing to: ' + req.path);
	validateRequest(req, function( err ) {
		if(err == null) {
			next();
		} else {
			res.status(401).send({error : "Not a valid request, missing headers" , description : err });
		}
	});
});

 // START API HERE

 // Users endpoint

router.route(constants.PATH_usersEndpoint)
    .post(usersEndpoint.addUser)
    .get(usersEndpoint.getAllusersEndpoint);

router.route(constants.PATH_usersEndpoint_USER_NAME)
    .get(usersEndpoint.getUserByName)

router.route(constants.PATH_usersEndpoint_USERID)
    .get(usersEndpoint.getUserById)
    .put(usersEndpoint.updateUser);


// Leagues endpoint
    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/wePlay', router);

// START THE SERVER
// =============================================================================
app.listen(port);
logger.audit('main', "Listening on port: " + port);

// Validate the request
function validateRequest( req, callback ) {
	var clientId = req.get(Constants.CLIENT_ID);
	users.getUserById(clientId, function(result, err) {
		if( err == null ) {
			// No user was found
			callback( "No Client was found in the DB, error: " + err );
		} else {
			// User was found
			callback(null);
		}
	});
}






