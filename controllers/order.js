const Order = require('../models/Order')
const User = require('../models/User')
class OrderClass {

  async orderCreate(req, res) {
    req.body.userId = req.userId
    const items = await Order.create(req.body)
    const user = await User.findById(req.userId)

    let coupons = user.coupons
    let couponId = req.body.discount.couponId
    if (couponId) {
      let index = coupons.findIndex(i => i._id === couponId)
      coupons.splice(index, 1)
    }
    await User.updateOne({ _id: req.userId }, { consum: user.consum + req.body.priceTotal, coupons })
    res.send(items)
  }
  async orderFind(req, res) {
    const items = await Order.find().populate('userId').sort({ _id: -1 })
    res.send(items)
  }
  async findOrderinfo(req, res) {
    const items = await Order.findById(req.params.orderid)
    res.send(items)
  }
  async orderByUser(req, res) {
    const items = await Order.find({ userId: req.userId }).sort({ _id: -1 })
    console.log(items)
    res.send(items)
  }
  async orderUpdate(req, res) {
    const model = await Order.findByIdAndUpdate(req.params.orderid || req.params.id, req.body)
    console.log(req)
    res.send(model)
  }
  async orderDelete(req, res) {
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json({
      code: 200,
      message: '删除订单成功'
    })
  }


}

module.exports = new OrderClass();