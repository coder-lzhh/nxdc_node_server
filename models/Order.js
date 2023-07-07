const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userPhone: { type: Number },
  orderNumber: { type: String },
  takeTime: { type: String },
  packingFee: { type: String },
  deliveryCost: { type: String },
  orderOut: {
    name: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  isOrderOut: { type: Boolean },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  priceTotal: { type: Number },
  postscript: {
    type: String,
    default: '制作中'
  },
  evaluate: {
    type: Boolean,
    default: false
  },
  discount: { type: Object },
  remark: { type: String },
  channel: { type: String },
  goods: [{
    number: { type: Number },
    price: { type: Number },
    name: { type: String },
    props_text: { type: String },
    goodId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Goods' },
  }]
}, {
  timestamps: true
})



module.exports = mongoose.model('Order', schema, "orders")