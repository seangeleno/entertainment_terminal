var bodyParser = require('body-parser')
,   User       = require('../models/user')
,   jwt        = require('jsonwebtoken')
// ,   config     = require('config/config.js');

//super secret for creating tokens
var superSecret = "super";

module.exports = function(app, express) {

  var apiRouter = express.Router();

  //route to generate sample user

  apiRouter.post('/sample', function(req, res) {

    // searches for the user named test
    User.findOne({ 'username': 'test' }, function(err, user) {

      // if there is no test user, create one
      if (!user) {
        var sampleUser = new User();

        sampleUser.first_name = 'test';
        sampleUser.last_name = 'test';
        sampleUser.username = 'test';
        sampleUser.email = 'test@test';
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
    console.log("Request:",req.body)
    User.findOne({
      email: req.body.email
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
  //
  // //route middleware to verify a token
  // apiRouter.use(function(req, res, next){
  //   //do logging
  //   console.log('Somebody just came to our app!');
  //
  //   //check header or url parameters or post parameters for token
  //   var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //
  //   //decode token
  //   if (token) {
  //     //verifies secret and checks express
  //     jwt.verify(token, superSecret, function(err, decoded){
  //
  //       if (err) {
  //         res.status(403).send({
  //           success: false,
  //           message: 'Failed to authenticate token.'
  //         });
  //       } else {
  //         //if everything is good, save to request for use in other routes
  //         req.decoded = decoded;
  //
  //         next();
  //       }
  //     });
  //
  //   } else {
  //     //if there is no token return HTTP response of 403 (access forbidden)
  //     res.status(403).send({
  //       success: false,
  //       message: 'No token provided.'
  //     });
  //
  //
  //   }
  // });

  //test route to make sure everything is working
  //accessed at GET http://localhost:3000/api
  apiRouter.get('/', function(req, res){
    res.json({message: 'Horray! Welcome to our API!'});
  });

  //on routes that end in /users
  apiRouter.route('/users')
  //get all the users(acessed at GET http://localhost:3000/api/users)
    .get(function(req, res){
      console.log('get users')
      User.find({}, function(err, users){
        console.log(users);
        if (err) res.send(err);

        //return the users
        res.json(users)
      });
    })
    //create a user (accessed at POST http://localhost:3000/users)
    .post(function(req, res){

      var user = new User();                    //create a new instance of the User model
      user.first_name = req.body.first_name;    //set the users first name(comes from the request)
      user.last_name = req.body.last_name;      //set the users last name(comes from the request)
      user.username = req.body.username;        //set the users username(comes from the request)
      user.email = req.body.email               //set the users email(comes from the request)
      user.password = req.body.password;        //set the users password(comes from the request)

      user.save(function(err){
        if (err) {
          //duplicate entry
          if (err.code == 11000)
            return res.json({success: false, message: 'A user with that username already exists.'});
          else
            return res.send(err);
        }

        //return a message
        res.json({message: 'User created!'});
      });
    })



  //on routes that end in /users/:user_id
  apiRouter.route('/users/:user_id')

    //get the user with that id
    .get(function(req, res){
      User.findById(req.params.user_id, function(err, user){
        if (err) res.send(err);

        //return that user
        res.json(user);
      });
    })

  //update the user with this id
  .put(function(req, res){
    User.findById(req.params.user_id, function(err, user){

      if (err) res.send(err);

      //set the new user information if it exists in the request
      if (req.body.first_name) user.first_name = req.body.first_name;
      if (req.body.last_name) user.last_name = req.body.last_name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.email) user.email = req.body.email;
      if (req.body.password) user.password = req.body.password;

      //save the user
      user.save(function(err){
        if (err) res.send(err);

        //retuen a message
        res.json({message: 'User updated!'});
      });
    });
  })

  //delete the user with this id
  .delete(function(req, res){
    User.remove({
      _id: req.params.user_id
    }, function(err, user){
      if (err) res.send(err);

      res.json({message: 'Successfully deleted'});
    });
  });

  //api endpoint to get user information
  apiRouter.get('/me', function(req, res){
    res.send(req.decoded);
  });

  return apiRouter
};
