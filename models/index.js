const Sequelize = require('sequelize')
const allConfigs = require('../config/sequelize')
const textMessagesModel = require('./textMessages')
const contactsModel = require('./contacts')
const textCampaignsModel = require('./textCampaigns')

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect
})

const Contacts = contactsModel(connection, Sequelize)
const TextCampaigns = textCampaignsModel(connection, Sequelize)
const TextMessages = textMessagesModel(connection, Sequelize, Contacts, TextCampaigns)

Contacts.belongsToMany(TextCampaigns, { through: TextMessages })
TextCampaigns.belongsToMany(Contacts, { through: TextMessages })



module.exports = {
  Contacts,
  TextCampaigns,
  TextMessages,
  Op: Sequelize.Op
}

