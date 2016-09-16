var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  created_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Users', userSchema)
