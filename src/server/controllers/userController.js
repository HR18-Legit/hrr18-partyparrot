var mongoose = require('mongoose');

var Promoter = require('../models/promoting.js');
var User = require('../models/users.js');
var Event = require('../models/event.js');

var Q = require('q');

var findUser = Q.nbind(User.findOne, User);
var findUsers = Q.nbind(User.find, User);

module.exports = {
    getUser: function(req, res){
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

        findUser({"email": req.body.userEmail})
            .then(function(user){
                console.log("USER", user);
                user.eventsPromoting.push({
                    "userEmail": req.body.userEmail,
                    "eventId": req.body.eventId,
                    "bitlyLink": req.body.bitlyLink
                });

                user.save(function(err){
                    if(err) res.json(404, {error: err});
                    res.json({message: 'Promoter registered'});
                })
            })
            .catch(function(error){
                res.json(404, {error: err});
            })
        
    },

    getPromoters: function(req, res){
        console.log(req.params.id)
        findUsers()
            .then(function(users){
                var results = []; 

                users.forEach(function(user){
                    console.log("USER", user);
                    user.eventsPromoting.forEach(function(eventPromoting){
                        console.log("EVENT", eventPromoting)
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

    addEvent: function(req,res){
        console.log(req.body.userEmail);
        findUser({"email": req.body.userEmail})
            .then(function(user){
                user.events.push({
                    "name": req.body.name,
                    "desc": req.body.desc,
                    "gPoint": req.body.gPoint,
                    "gReward": req.body.gReward,
                    "sPoint": req.body.sPoint,
                    "sReward": req.body.sReward,
                    "bPoint": req.body.bPoint,
                    "bReward": req.body.bReward,
                    "eventbrite": req.body.event
                });

                user.save(function (err) {
                    if (err) {console.error(err)}
                    res.status(201).json({message: 'Event added'});
                });
            })


        
    },

    getUserEvents: function(req,res) {
        console.log(req.params.id)
        findUser({"email": req.params.email}) 
            .then(function(user){
                console.log(user);
                res.json(user.events);
            })
            .catch(function(err){
                res.json({error: err})
            })
    }
};