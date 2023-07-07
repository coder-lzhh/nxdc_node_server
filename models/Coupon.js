const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: { type: String },
  desc: { type: String },
  type: { type: Number },
  consume: { type: Number },
  value: { type: Number },
  enough: {
    type: Number,
    default: 0
  },
  count: { type: Number },
})



module.exports = model('Coupon', schema, "coupons")