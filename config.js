module.exports = {
  port: process.env.PORT || 3000,
  db: {
    url: process.env.MONGODB_URI || 'mongoURL',
  }
}