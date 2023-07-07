const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  values: [{ value: { type: String } }],
})



module.exports = mongoose.model('Property', schema, "Properties")