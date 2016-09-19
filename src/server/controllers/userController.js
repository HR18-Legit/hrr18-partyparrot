var mongoose = require('mongoose');
var Promoter = require('../models/promoting.js');
var User = require('../models/users.js');
var Event = require('../models/event.js');

var Q = require('q');

var findUser = Q.nbind(User.findOne, User);
var findUsers = Q.nbind(User.find, User);

module.exports = {
  getUser: function(req, res){
        var event = {};
        console.log(req.params.email)
        findUser({"email": req.params.email})
            .then(function(user){
                res.json(user);
            })
            .catch(function(err){
                res.json(err);
            })
    },

    addPromoter: function(req, res){
        console.log(req.body)
        findUser({"email": req.body.userEmail})
            .then(function(user) {
                user.eventsPromoting.push({
               "userEmail": req.body.userEmail,
               "ownerEmail": req.body.ownerEmail,
               "ownerName": req.body.ownerName,
               "eventId": req.body.eventId,
               "bitlyLink": req.body.bitlyLink,
               "eventbrite" : req.body.eventbrite,
               "bPoint": req.body.bPoint,
               "bGoal": req.body.bGoal,
               "sPoint": req.body.sPoint,
               "sGoal": req.body.sGoal,
               "gPoint": req.body.gPoint,
               "gGoal": req.body.gGoal,
               "name": req.body.name
                });

                user.save(function(err) {
                    if(err) res.json( 404, {error: err} );
                    res.json( {message: 'Promoter registered'} );
                });
            })
            .catch(function(error) {
                res.json( 404, {error: err} ) ;
            })

    },

    getAllEvents: function (req, res, next) {
        User.find({}, function(err, users) {
            if (err) { console.error(err) }
            var events = [];
            users.forEach(function(user){
            events = events.concat(user.events);
        });
            res.json(events);
        });
    },

    getEvent: function(req, res){
        findUsers()
            .then(function(users){
                var result = [];
                users.forEach(function(user){
                    user.events.forEach(function(event){
                        if(event._id == req.params.id){
                            result.push(event);
                        }
                    })
                });
                res.json(result);
            })
            .catch(function(err){
                res.json({error: err});
            })
    },

    getPromoters: function(req, res) {
        findUsers()
            .then(function(users){
                var results = [];

                users.forEach(function(user) {
                    user.eventsPromoting.forEach(function(eventPromoting) {
                        if(eventPromoting.eventId === req.params.id){
                            results.push(eventPromoting);
                        }
                    })
                });

                res.json(results);
            })
            .catch(function(err){
                res.json({error: err});
            })
    },

    addEvent: function(req,res) {
        findUser( {"email": req.body.userEmail} )
            .then(function(user){
                user.events.push({
                    "name": req.body.name,
                    "desc": req.body.desc,
                    "userEmail": req.body.userEmail,
                    "gPoint": req.body.gPoint,
                    "gReward": req.body.gReward,
                    "sPoint": req.body.sPoint,
                    "sReward": req.body.sReward,
                    "bPoint": req.body.bPoint,
                    "bReward": req.body.bReward,
                    "amountRaised": req.body.amountRaised,
                    "eventbrite": req.body.event
                });

                user.save(function (err) {
                    if (err) {console.error(err)}
                    res.status(201).json({message: 'Event added'});
                });
            })



    },

    getUserEvents: function(req,res) {
        findUser( {"email": req.params.email} )
            .then(function(user){
                console.log(user);
                res.json(user.events);
            })
            .catch(function(err){
                res.json({error: err})
            })
    },

    updateAmountRaised: function(e, id, amount){
        console.log(arguments);
        findUsers()
            .then(function(users){
                users.forEach(function(user){
                    user.events.forEach(function(event) {
                if(event._id == id) {
                    event.amountRaised = Number(event.amountRaised) || 0;
                    event.amountRaised += Number(amount);

                user.save(function (err, user) {
                  if (err) {console.error(err)}
                  console.log("charge entered in db");
                });
            }
                })
          })
        })
    }


};