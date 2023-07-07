module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')


  const jwt = require('jsonwebtoken')
  const PRIVATE_KEY = 'token_key'
  const JWT_EXPIRED = 60 * 60 * 10
  const PW_ONLY = 'lzhlzhlzh'



  const {
    findMenu
  } = require('../controllers/category');


  const {
    userUpdate, userFindById
  } = require('../controllers/user');

  const {
    evaluateFind, evaluateCreate
  } = require('../controllers/evaluate');

  const {
    storeFind
  } = require('../controllers/store');

  const {
    couponFind, couponFindById, CouponByUser, exchangeCoupon
  } = require('../controllers/coupon');


  const {
    orderCreate, orderUpdate, findOrderinfo, orderByUser
  } = require('../controllers/order');

  const User = require('../models/User')

  const router = express.Router()


  const expressJwt = require('express-jwt');
  const crypto = require('crypto')



  const multer = require('multer')
  app.use('/upload', express.static(__dirname + '/uploads'))

  function md5(s) {
    // 注意参数需要为 String 类型，否则会出错
    return crypto.createHash('md5')
      .update(String(s)).digest('hex');
  }

  const jwtAuth = expressJwt({
    secret: PRIVATE_KEY,
    algorithms: ['HS256'],
    credentialsRequired: true // 设置为false就不进行校验了，游客也可以访问
  }).unless({
    path: [
      '/web/api/login',
      '/web/api/register',
      '/web/api/category',
      '/web/api/store',
      '/web/api/comment',
      '/web/api/coupons',
    ], // 设置 jwt 认证白名单
  });

  router.use(jwtAuth)

  router.get('/userinfo', userFindById)
  router.put('/userinfo', userUpdate)
  //获取菜单
  router.get('/category', findMenu)
  //获取商家信息
  router.get('/store', storeFind)


  //个人拥有的优惠券信息
  router.get('/mycoupons', CouponByUser)
  //全部优惠券信息
  router.get('/coupons', couponFind)
  //单个优惠券信息
  router.get('/coupon/:id', couponFindById)
  //兑换优惠券
  router.put('/coupon', exchangeCoupon)

  router.post('/order', orderCreate)
  router.get('/orders', orderByUser)
  router.get('/order/:orderid', findOrderinfo)
  router.put('/order/:orderid', orderUpdate)

  router.post('/comment', evaluateCreate)
  router.get('/comment', evaluateFind)



  router.post('/login', async (req, res) => {
    let user = req.body
    const model = await User.findOne({ userPhone: user.userPhone })

    if (model) {
      let userInfo = await User.findOne({
        userPhone: user.userPhone, password: md5(`${user.password}${PW_ONLY}`)
      })

      if (userInfo) {
        const token = jwt.sign(
          { userId: userInfo._id },
          PRIVATE_KEY,
          { expiresIn: JWT_EXPIRED }
        )

        res.status(200).json({
          code: 200,
          token: `Bearer ${token}`,
          userId: userInfo._id,
        })
      } else {
        res.status(200).json({
          code: 401,
          message: '账号或密码错误！'
        })
      }

    } else {
      res.status(200).json({
        code: 401,
        message: '账号或密码错误！'
      })
    }


  })
  router.post('/register', async (req, res) => {
    let user = req.body
    const model = await User.findOne({ userPhone: user.userPhone })
    if (model) {
      res.status(200).json({
        code: 401,
        message: '账号已存在！'
      })

    } else {
      user.password = md5(`${user.password}${PW_ONLY}`)
      await User.create(user)
      res.status(200).json({
        code: 200,
        message: '账号注册成功快去登录吧！'
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



  app.use('/web/api', (req, res, next) => {

    let userId = ''
    if (req.headers && req.headers.authorization) {
      const token = String(req.headers.authorization || '').split(' ').pop()
      let user = jwt.verify(token, PRIVATE_KEY)
      userId = user.userId
      console.log(userId)
    }

    req.userId = userId
    next()
  }, router)



  // 错误处理函数
  app.use(async (err, req, res, next) => {

    console.log(err)
    console.log(err.message)
    if (err.name === 'UnauthorizedError' || err.message === 'jwt expired') {
      res.status(200).json({
        message: 'token过期',
        code: 400
      })
    }
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })


}