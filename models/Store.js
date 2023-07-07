const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  info: { type: String },
  phone: { type: String },
  deliveryCost: { type: String },
  packingFee: { type: String },
})

module.exports = mongoose.model('Store', schema, "stores")