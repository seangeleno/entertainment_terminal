var express       = require('express') //this calls express
,   app           = express() //this defines the app using express
,   bodyParser    = require('body-parser')
,   morgan        = require('morgan') //used to see requests
,   mongoose      = require('mongoose') //provides Schemas and Active Record
,   rotten        = require('rotten-api')("YOU_API_KEY")
,   config        = require('./config') // //importing file that has global environmental variables assigned
,   path          = require('path');

// App Configuration goes here!
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));

//connect to our database ()

mongoose.connect('', function(err){
  if(err) throw err
  console.log('Connected to MongoDB');
})

//set static files location used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API

var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

//DA MAIN ROUTE
//Send users to frontend
//has to be registered after API routes
app.get('*', function(req, res){ // any route that isn't API then load static index.html
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//SERVER STARTS HERE
app.listen(config.port);
console.log('BOOM SHAKALAKA: PORT ' + config.port + ' is up n running');
