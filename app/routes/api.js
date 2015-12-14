var bodyParser = require('body-parser')
,   User       = require('../models/user')
,   jwt        = require('jsonwebtoken')
,   config     = require('../../config');

//super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

  var apiRouter = express.Router();

  //route to generate sample user

  apiRouter.post('/sample', function(req, res) {

    // searches for the user named test
    User.findOne({ 'username': 'test' }, function(err, user) {

      // if there is no test user, create one
      if (!user) {
        var sampleUser = new User();

        sampleUser.name = 'test';
        sampleUser.username = 'test';
        sampleUser.password = 'test';

        sampleUser.save();
      } else {
        console.log(user);

        //if there is a test user, update the password
        user.password = 'test';
        user.save();
      }

      res.send('done')

    });

  });

  // route to authenticate a user (POST http://localhost:8080/api/authenticate)
  apiRouter.post('/authenticate', function(req, res) {
    //find the user
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function(err, user){

      if (err) throw err;

      //no user with that username was found
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {

        // check if password matches
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {

          //if user is found and password is right
          //create a token
          var token = jwt.sign({
            name: user.name,
            username: user.username
          }, superSecret, {
            expiresInMinutes: 1440 // aka 24 hours
          });

          //return the information including token as json
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }

      }

    });
  });

  //route middleware to verify a token
  apiRouter.use(function(req, res, next){
    //do logging
    console.log('Somebody just came to our app!');

    //check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //decode token
    if (token) {
      //verifies secret and checks express
      jwt.verify(token, superSecret, function(err, decoded){

        if (err) {
          res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          //if everything is good, save to request for use in other routes
          req.decoded = decoded;

          next();
        }
      });

    } else {
      //if there is no token return HTTP response of 403 (access forbidden)
      req.status(403).send({
        success: false,
        message: 'No token provided.'
      });


    }
  });

}
