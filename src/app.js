const express = require('express')
const config = require('./config')
const PORT = config.port || 3000;

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>WhatsApp Backend Clone!</h1>')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app