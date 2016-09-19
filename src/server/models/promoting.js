var mongoose = require('mongoose')
var promoterSchema = new mongoose.Schema({
  userEmail: String,
  ownerEmail: String,
  ownerName: String,
  eventId: String,
  bitlyLink: String,
  eventbrite: {},
  bPoint: String,
  bGoal: String,
  sPoint: String,
  sGoal: String,
  gPoint: String,
  gGoal: String,
  name: String
})

module.exports = promoterSchema
