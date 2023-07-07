module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')


  const jwt = require('jsonwebtoken')
  const PRIVATE_KEY = 'token_key'
  const JWT_EXPIRED = 60 * 60 * 10
  const PW_ONLY = 'lzhlzhlzh'
  const expressJwt = require('express-jwt');

  const multer = require('multer')
  app.use('/upload', express.static(__dirname + '/uploads'))


  const {
    categoryFind, categoryCreate, categoryUpdate, categoryDelete
  } = require('../controllers/category');

  const {
    propertyFind, propertyCreate, propertyUpdate, propertyDelete
  } = require('../controllers/property');

  const {
    couponFind, couponCreate, couponUpdate, couponDelete
  } = require('../controllers/coupon');

  const {
    goodsFind, goodsCreate, goodsUpdate, goodsDelete
  } = require('../controllers/goods');

  const {
    orderFind, orderUpdate, orderDelete
  } = require('../controllers/order');

  const {
    userFind, userUpdate, userDelete
  } = require('../controllers/user');

  const {
    evaluateFind, evaluateDelete
  } = require('../controllers/evaluate');
  const {
    storeFind, storeUpdate, storeCreate, storeDetele
  } = require('../controllers/store');




  const router = express.Router()

  const jwtAuth = expressJwt({
    secret: PRIVATE_KEY,
    algorithms: ['HS256'],
    credentialsRequired: true // 设置为false就不进行校验了，游客也可以访问
  }).unless({
    path: [
      '/admin/api/login']
  });
  router.use(jwtAuth)

  //商品列表
  router.get('/category', categoryFind)
  router.post('/category', categoryCreate)
  router.put('/category/:id', categoryUpdate)
  router.delete('/category/:id', categoryDelete)
  //商品属性
  router.post('/property', propertyCreate)
  router.get('/property', propertyFind)
  router.put('/property/:id', propertyUpdate)
  router.delete('/property/:id', propertyDelete)
  //商家
  router.get('/store', storeFind)
  router.post('/store', storeCreate)
  router.put('/store/:id', storeUpdate)
  router.delete('/store/:id', storeDetele)
  //优惠券
  router.post('/coupon', couponCreate)
  router.get('/coupon', couponFind)
  router.put('/coupon/:id', couponUpdate)
  router.delete('/coupon/:id', couponDelete)
  //商品分类
  router.post('/goods', goodsCreate)
  router.get('/goods', goodsFind)
  router.put('/goods/:id', goodsUpdate)
  router.delete('/goods/:id', goodsDelete)
  //订单
  router.get('/orders', orderFind)
  router.put('/order/:id', orderUpdate)
  router.delete('/order/:id', orderDelete)
  //用户
  router.delete('/user/:id', userDelete)
  router.put('/user/:id', userUpdate)
  router.get('/users', userFind)
  //评论列表
  router.get('/comment', evaluateFind)
  router.delete('/comment/:id', evaluateDelete)


  router.post('/login', async (req, res) => {
    let zh = 'admin'
    let pw = '123456'
    let user = req.body

    console.log(user)
    const token = jwt.sign(
      { username: 'nxdc' },
      PRIVATE_KEY,
      { expiresIn: JWT_EXPIRED }
    )
    if (user.username === zh) {

      if (user.password === pw) {
        res.status(200).json({
          code: 200,
          token: `Bearer ${token}`,
          userId: 'nxdc',
          message: '登录成功'
        })
      } else {
        res.status(200).json({
          code: 400,
          message: '账号或密码错误'
        })
      }

    } else {
      res.status(200).json({
        code: 400,
        message: '账号或密码错误'
      })
    }


  })





  const upload = multer({ dest: __dirname + '/uploads' })


  router.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req)
    const file = req.file
    file.url = `http://localhost:3000/upload/${file.filename}`
    res.send(file)
  })


  app.use('/admin/api', router)



  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

}