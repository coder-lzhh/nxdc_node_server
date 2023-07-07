const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  type: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  name: { type: String },
  price: { type: Number },
  desc: { type: String },
  image: { type: String },
  property: [
    {
      name: { type: String },
      values: [{
        value: { type: String }
      }]
    }
  ],
  isShow: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('Goods', schema, "goods")