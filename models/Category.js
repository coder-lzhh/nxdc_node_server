const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
})

schema.virtual('children', {
  localField: '_id',
  foreignField: 'type',
  justOne: false,
  ref: 'Goods'
})

module.exports = mongoose.model('Category', schema, 'Categories')