var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var middleware = './middleware/middleware';
var stormpath = require('express-stormpath');
var Eventbrite = require('eventbrite-node');
var config = require('../config/eventbrite');
var Event = require('./models/event');
var User  = require('./models/users');
var client = new Eventbrite(config.clientKey, config.clientSecret);

//Alias for heroku ports/db vs local
var PORT = process.env.PORT || 8080;
var db =  process.env.MONGODB_URI || 'mongodb://localhost/PartyParrot';
mongoose.connect(db);

//mongoose's promise library is depricated.
mongoose.Promise = global.Promise;
var app = express();

// Setups stormpath. The application:{href: https://..} is unique to the
// storm path application being used to do the authentication for this app.
// Please change this for your application
app.use(stormpath.init(app, {
  web: {
    register: {
      autoLogin: false,
      nextUri: '/'
    }
  },
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
    res.redirect(302, 'http://localhost:8080/clientlogin')
    
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

app.get('/parrot', function(req,res){
  res.sendFile(path.join(__dirname, '/../public/parrot.html'));
})
//In the interest of time and speed we created one schema to avoid joins
app.post('/create',stormpath.loginRequired, function(req,res){
  var event = new Event({
  name: req.body.event.name.text,
  desc: req.body.event.description.text,
  promoters: [req.user.fullName],
  owner: req.user.username,
  gPoint: req.body.gPoint,
  gReward: req.body.gReward,
  sPoint: req.body.sPoint,
  sReward: req.body.gReward,
  bPoint: req.body.bPoint,
  bReward: req.body.gReward,
  eventbrite: req.body.event
  });
  event.save(function (err, post) {
    if (err) {console.error(err)}
    res.status(201).json('Hey I posted ' + post);
  });
});

// Returns all events independent of what user is logged in
app.get('/events', function (req, res, next) {
  Event.find(function(err, events) {
    if (err) { console.error(err) }
    res.json(events);
  })
})

// Returns events that only the user who is logged in has created
app.get('/userEvents', stormpath.loginRequired, function(req,res) {
  Event.find({'owner': req.user.username}, function(err, event) {
    if (err) console.error(err);
    res.json(event);
  })
})

// This is only a test to see if the user is authenticated, and not needed
// for this project.
app.get('/secrets', stormpath.loginRequired, function(req,res){
  res.send('Hi ' + req.user.givenName);
})


// If no app.get path was found for request, this is the default, which will
// then use the react router
app.set('view engine', 'pug')

app.get('*', function (req, res) {
  //res.render('index', {test: 'test1'})
 res.sendFile(path.join(__dirname, '/../public/index.html'));
});



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
