const express = require("express")

const app = express()

app.use(express.json())
app.use(require('cors')())

require('./plugins/db')(app)
require('./admin')(app)
require('./web')(app)


app.listen(3000, () => {
  console.log('启动成功','http://localhost:3000');
});