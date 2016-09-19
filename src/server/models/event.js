var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  name: String,
  desc: String,
  userEmail: String,
  gPoint: Number,
  gReward: String,
  sPoint: Number,
  sReward: String,
  bPoint: Number,
  bReward: String,
  amountRaised: Number,
  donors: { type : mongoose.Schema.Types.Mixed },
  eventbrite: {},
  created_at: {type:Date, default: Date.now}
});
module.exports = eventSchema;