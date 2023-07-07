module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://127.0.0.1:27017/nxdc', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((res,rej)=>{
    console.log('res')
    console.log('rej')
  }).catch(e=>{
    console.log('e')
  })

}