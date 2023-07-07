const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  orderId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Order' },
  ratePics: [{ type: Object }],
  content: { type: String },
  totalScore: { type: Number },
  tasteScore: { type: Number },
  serveScore: { type: Number },
}, {
  timestamps: true
})



module.exports = mongoose.model('Evaluate', schema, "evaluates")