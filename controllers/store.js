const Store = require('../models/Store')
class StoreClass {

  async storeFind(req, res) {
    const items = await Store.find()
    console.log(items)
    res.send(items)
  }

  async storeUpdate(req, res) {
    const model = await Store.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  }
  async storeCreate(req, res) {
    const model = await Store.create(req.body)
    res.send(model)
  }
  async storeDetele(req, res) {
    await Store.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  }
}

module.exports = new StoreClass();