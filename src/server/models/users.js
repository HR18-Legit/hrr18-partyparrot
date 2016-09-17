var mongoose = require('mongoose')

var Event = require('./event.js');
var Promoting = require('./promoting.js');

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  events: [ Event ],
  eventsPromoting: [ Promoting ],
  created_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User', userSchema)
