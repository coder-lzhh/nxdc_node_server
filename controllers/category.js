const Category = require('../models/Category')
class CategoryClass {
  async categoryCreate(req, res) {
    console.log(req.body)
    const model = await Category.create(req.body)
    res.send(model)
  }
  async categoryFind(req, res) {
    const items = await Category.find()
    res.send(items)
  }
  async findMenu(req, res) {
    const items = await Category.find().populate('children').lean()
    res.send(items)
  }
  async categoryDelete(req, res) {
    await Category.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  }
  async categoryUpdate(req, res)  {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    console.log(req)
    res.send(model)
  }

}

module.exports = new CategoryClass();