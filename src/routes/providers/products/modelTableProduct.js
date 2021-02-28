const Sequelize = require('sequelize')
const connection = require('../../../database/connection')

const columns = {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  provider: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: require('../modelTableProviders'),
      key: 'id'
    }
  }
}

const options = {
  freezeTableName: true,
  tableName: 'product',
  timestamps: true,
  createdAt: 'dataCriacao',
  updatedAt: 'dataAtualizacao',
  version: 'versao'
}

module.exports = connection.define('product', columns, options)
