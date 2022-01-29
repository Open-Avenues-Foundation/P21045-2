const TextMessages = (connection, Sequelize, Contacts, TextCampaigns) => {
  return connection.define('textMessages', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    contactId: { type: Sequelize.INTEGER, references: { model: Contacts, key: 'id' } },
    textCampaignId: { type: Sequelize.INTEGER, references: { model: TextCampaigns, key: 'id' } },
    Time_Sent: { type: Sequelize.DATE, allowNull: false },
    Status: { type: Sequelize.TINYINT, allowNull: false }
  }, { paranoid: true })
}

module.exports = TextMessages

