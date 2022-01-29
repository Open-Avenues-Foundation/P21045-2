const Sequelize = require('sequelize')
const allConfigs = require('../configs/sequelize')
// const textMessageModel = require('./textMessage')
const contactsModel = require('./contacts')

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect
})

// const textMessage = textMessageModel(connection, Sequelize)
const Contacts = contactsModel(connection, Sequelize)

module.exports = {
  // textMessage,
  Contacts,
  Op: Sequelize.Op
}
