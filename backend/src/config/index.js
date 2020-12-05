require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3333,
  dbUri: process.env.DB_URI
}
