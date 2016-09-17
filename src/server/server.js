//============ set up ================
var express = require('express');
var mongoose = require('mongoose');
var middleware = './middleware/middleware';

var path = require('path');
var bodyParser = require('body-parser');

//============ external apis ================
var stormpath = require('express-stormpath');
var Eventbrite = require('eventbrite-node');
var config = require('../config/eventbrite');
var client = new Eventbrite(config.clientKey, config.clientSecret);

//============ models ================
var Event = require('./models/event');
var User  = require('./models/users');

//============ controllers ================
var UserController = require('./controllers/userController.js');


//Alias for heroku ports/db vs local
// var PORT = process.env.PORT || 8080;
// var db =  'mongodb://localhost/PartyParrot';
// var connection = mongoose.connect(db);

var PORT = process.env.PORT || 8080;
var db =  process.env.MONGODB_URI || 'mongodb://localhost/PartyParrot';
mongoose.connect(db);

//mongoose's promise library is depricated.
mongoose.Promise = global.Promise;
var app = express();

//============ STORMPATH ================
// Setups stormpath. The application:{href: https://..} is unique to the
// storm path application being used to do the authentication for this app.
// Please change this for your application
app.use(stormpath.init(app, {
  application: {
    href: 'https://api.stormpath.com/v1/applications/1CRNyLHi8Nyf3Us1waWwVp'
  },
  website: true,
  postRegistrationHandler: function (account, req, res, next) {
    console.log('User:', account.email, account, 'just registered!')
    var user = new User({
      firstName: account.givenName,
      lastName: account.surname,
      email: account.email
    })
    user.save(function (err, post) {
      if (err) { console.error(err) }
    })
    next()
  },
    postLoginHandler: function (account, req, res, next) {
      console.log('User:', account, 'just logged in!');
      next()

      User.findOne({email: account.email}, function (err, account) {
        console.log(account)
      })
    }
}))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

//============ POST ================
// Add a promoter to a specific event
app.post('/add/promoter', stormpath.loginRequired, UserController.addPromoter);

// Easter Egg Disabled
// app.get('/parrot', function(req,res){
//   res.sendFile(path.join(__dirname, '/../public/parrot.html'));
// })

// Adds event to logged in user
app.post('/add/event', stormpath.loginRequired, UserController.addEvent);

//============ GET ================
// Returns user info
app.get('/user/:email', stormpath.loginRequired, UserController.getUser);

// Returns all events for all users
app.get('/events', function (req, res, next) {
  User.find({}, function(err, users) {
    if (err) { console.error(err) }
    var events = [];
    users.forEach(function(user){
      events = events.concat(user.events);
    })
    console.log(events);
    res.json(events);
  });
});

// Returns single user's events
app.get('/user/:email/events', stormpath.loginRequired, UserController.getUserEvents);

// Returns all promoters for a certain event
app.get('/events/:id/promoters', UserController.getPromoters);

// This is only a test to see if the user is authenticated, and not needed
// for this project.
app.get('/secrets', stormpath.loginRequired, function(req,res){
  res.send('Hi ' + req.user.givenName);
})


// If no app.get path was found for request, this is the default, which will
// then use the react router
app.set('view engine', 'pug')


//============ CATCH ALL ================
app.get('*', function (req, res) {
  //res.render('index', {test: 'test1'})
 res.sendFile(path.join(__dirname, '/../public/index.html'));
});



//============ EVENTBRITE ================
//Eventbrite auth. Currently single user.
app.get('/authentication', function(req, res){
  var authUrl = client.getOAuthUrl();
  res.redirect(authUrl);
  client.authorize(req.query.code, function(err, response) {
    if (err) {
      console.log.error(err);
      return;
    }
    console.log(response.access_token);
  });
});

//This is an entry point for stormpath integration.
app.on('stormpath.ready', function() {
  app.listen(PORT);
});

module.exports = app;
