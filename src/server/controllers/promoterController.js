var Promoter = require('../models/promoter.js');
var User = require('../models/users.js');

var Q = require('q');

var findPromoters = Q.nbind(Promoter.find, Promoter);
var findUser = Q.nbind(User.findOne, User);

module.exports = {
    addPromoter: function(req, res){

        findUser({"_id": req.body.user_id})
            .then(function(user){
                var newPromoter = new Promoter({
                    userId: req.body.userId,
                    eventId: req.body.eventId,
                    firstName: req.body.firstName,
                    bitlyLink: req.body.bitlyLink
                });

                newPromoter.save(function(err, newPromoter){
                    if(err){
                        res.send(404, err);
                    }else{
                        res.json({message: 'Promoter registered'});
                    }
                })
            })
            .catch(function(error){
                res.send(404, error);
            })
        
    },

    getPromoters: function(req, res){
        findPromoters({eventId: req.params.id})
            .then(function(promoters){
                res.json({promoters: promoters});
            })
            .catch(function(err){
                res.json({error: err});
                console.log("test");
            })
    }
}