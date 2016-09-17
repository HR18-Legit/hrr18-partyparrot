var mongoose = require('mongoose')

var promoterSchema = new mongoose.Schema({
  userEmail: String,
  eventId: String,
  bitlyLink: String
})

module.exports = promoterSchema;
