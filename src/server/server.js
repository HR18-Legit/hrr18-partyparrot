//============ set up ================
var express = require('express');
var mongoose = require('mongoose');
var middleware = './middleware/middleware';
var _ = require('lodash')
var axios = require('axios')

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

//============ controllers ===============
var UserController = require('./controllers/userController.js');


//LOCAL OPTION FOR DB
// var PORT = process.env.PORT || 8080;
// var db =  'mongodb://localhost/PartyParrot';
// var connection = mongoose.connect(db);

var PORT = process.env.PORT || 8080;
//AWS OPTION FOR MONGO DB
var options = {
  user: 'legituser',
  pass: 'legitlegacy'
};
mongoose.connect('mongodb://54.173.68.94:27017/legit', options);

//mongoose's promise library is depricated.
mongoose.Promise = global.Promise;
var app = express();

//============ STORMPATH ================
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
      res.redirect(302, 'http://localhost:8080/clientlogin')
    })

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
app.get('/events', UserController.getAllEvents);

// Returns one event
app.get('/events/:id', UserController.getEvent);

// Returns single user's events
app.get('/user/:email/events', stormpath.loginRequired, UserController.getUserEvents);

// Returns all promoters for a certain event
app.get('/events/:id/promoters', UserController.getPromoters);

// This is only a test to see if the user is authenticated, and not needed
// for this project.
// app.get('/secrets', stormpath.loginRequired, function(req,res){
//   res.send('Hi ' + req.user.givenName);
// })


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

//============ STRIPE PAYMENT ================
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

app.post('/api/payment', function(req, res, next) {
// Get the credit card details submitted by the form
var token = req.body.stripeToken;
console.log(token); // undefined
// Create a charge: this will charge the user's card
var charge = stripe.charges.create({
  amount: 1000,
  currency: "usd",
  source: token,
  description: "Example charge",
  metadata: {}
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {

    }
    else{
      console.log('in the line 166');

      UserController.updateAmountRaised('john@john.com', '57df283f49aee2355b243e7d', 10);
      res.send('success');
      // User.find({"email": req.body.email})

      //   .then(function(user){
      //     console.log(user, 1111111)
      //     user.events.forEach(function(event){
      //       if(event._id === req.body.eventId){
      //         event.amountRaised = Number(event.amountRaised) + charge.amount;

      //         user.save(function (err) {
      //             if (err) {console.error(err)}
      //             res.status(201).json({message: 'Amount raised updated'});
      //         });
      //       }
      //     })
      //   })
    }
  });

});


module.exports = app;
