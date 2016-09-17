var mongoose = require('mongoose')

var promoterSchema = new mongoose.Schema({
  userId: Number,
  fristName: String,
  eventId: Number,
  bitlyLink: String
})

module.exports = mongoose.model('Promoter', promoterSchema)
