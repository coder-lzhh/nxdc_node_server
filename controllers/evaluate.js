const Evaluate = require('../models/Evaluate')
class EvaluateClass {

  async evaluateFind(req, res) {
    const items = await Evaluate.find().sort({ _id: -1 })
    res.send(items)
  }
  async evaluateCreate(req, res) {
    const items = await Evaluate.create(req.body)
    await Order.updateOne({ _id: req.body.orderId }, { evaluate: true })
    res.send(items)
  }

  async evaluateDelete(req, res) {
    await Evaluate.findByIdAndDelete(req.params.id)
    res.status(200).json({
      code: 200,
      message: '删除评价成功'
    })
  }
}

module.exports = new EvaluateClass();