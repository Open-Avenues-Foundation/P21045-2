const TextCampaigns = (connection, Sequelize) => {
  return connection.define('textCampaigns', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    Message: { type: Sequelize.STRING, allowNull: false },
    Name: { type: Sequelize.STRING, allowNull: false },
    Time_Initiated: { type: Sequelize.DATE, allowNull: false },
    Status: { type: Sequelize.TINYINT, allowNull: false }
  }, { paranoid: true })
}

module.exports = TextCampaigns
