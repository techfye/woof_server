const ConnectToMongo = require('./config/db');
const express = require('express')
var cors = require('cors')
ConnectToMongo();
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/category', require('./routes/category'))
app.use('/api/products', require('./routes/product'))
app.use('/api/tags', require('./routes/tags'))
app.use('/api/orders', require('./routes/order'))
app.use('/uploads/images', express.static('uploads/images'))



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})