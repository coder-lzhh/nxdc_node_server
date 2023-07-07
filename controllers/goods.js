const Goods = require('../models/Goods')
class GoodsClass {
  async goodsCreate(req, res) {
    console.log(req.body)
    const model = await Goods.create(req.body)
    res.send(model)
  }
  async goodsFind(req, res) {
    const items = await Goods.find().populate('type')
    res.send(items)
  }
  async goodsUpdate(req, res) {
    const model = await Goods.findByIdAndUpdate(req.params.id, req.body)
    console.log(req)
    res.send(model)
  }
  async goodsDelete(req, res) {
    await Goods.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: '删除订商品成功'
    })
  }
}

module.exports = new GoodsClass();