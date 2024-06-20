require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    url: process.env.DB_URL || 'mongoURL',
  }
}