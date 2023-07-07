const User = require('../models/User')
class UserClass {

  async userFind(req, res) {
    const items = await User.find()
    res.send(items)
  }
  async userFindById(req, res) {
    const user = await User.findById(req.userId)
    res.send(user)
  }
  async userUpdate(req, res) {
    const model = await User.findByIdAndUpdate(req.userId || req.params.id, req.body)
    console.log(req)
    res.send(model)
  }
  async userDelete(req, res) {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      code: 200,
      message: '删除用户成功'
    })
  }
}

module.exports = new UserClass();