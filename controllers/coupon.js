const Coupon = require('../models/Coupon')
const User = require('../models/User')
class CouponClass {
  async couponCreate(req, res) {
    console.log(req.body)
    const model = await Coupon.create(req.body)
    res.send(model)
  }
  async couponFind(req, res) {
    const items = await Coupon.find()
    res.send(items)
  }
  async couponFindById(req, res) {
    const coupon = await Coupon.findById(req.params.id)
    res.send(coupon)
  }
  async CouponByUser(req, res) {
    const coupons = await User.findById(req.userId).populate('coupons.id')
    res.send(coupons)
  }
  async couponUpdate(req, res) {
    const model = await Coupon.findByIdAndUpdate(req.params.id, req.body)
    console.log(req)
    res.send(model)
  }
  async couponDelete(req, res) {
    await Coupon.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  }
  async exchangeCoupon(req, res) {
    const user = await User.findById(req.userId)
    const coupon = await Coupon.findById(req.body.couponId)
    user.consum = user.consum - coupon.consume

    user.coupons.push({ id: req.body.couponId, num: 1 })
    coupon.count = coupon.count - 1

    await User.updateOne({ _id: req.userId }, { coupons: user.coupons, consum: user.consum })
    await Coupon.updateOne({ _id: req.body.couponId }, { count: coupon.count })
    res.status(200).json({
      code: 200,
      message: '兑换成功'
    })
  }
}

module.exports = new CouponClass();