const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userPhone: { type: String },
  nikeName: { type: String },
  sex: { type: Number, default: 3 },
  password: { type: String, select: false, },
  consum: {
    type: Number,
    default: 0
  },
  orders: {
    type: mongoose.SchemaTypes.ObjectId, ref: 'Order'
  },
  coupons: [{
    id: { type: mongoose.SchemaTypes.ObjectId, ref: 'Coupon' },
    num: { type: Number }
  }],
  addresses: [{
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    sex: { type: Number }
  }]
}, {
  timestamps: true
})



module.exports = mongoose.model('User', schema, "users")