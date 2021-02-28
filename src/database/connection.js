const Sequelize = require('sequelize')
const config = require('config')

const connection = new Sequelize(
  config.get('mysql.database'),
  config.get('mysql.user'),
  config.get('mysql.password'), {
    host: config.get('mysql.host'),
    dialect: 'mysql'
  }
)

module.exports = connection
