const Property = require('../models/Property')
class PropertyClass {
  async propertyCreate(req, res) {
    console.log(req.body)
    const model = await Property.create(req.body)
    res.send(model)
  }
  async propertyFind(req, res) {
    const items = await Property.find()
    res.send(items)
  }
  async propertyUpdate(req, res) {
    const model = await Property.findByIdAndUpdate(req.params.id, req.body)
    console.log(req)
    res.send(model)
  }
  async propertyDelete(req, res) {
    await Property.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  }

}

module.exports = new PropertyClass();