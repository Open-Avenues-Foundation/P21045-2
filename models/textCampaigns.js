const TextCampaigns = (connection, Sequelize) => {
  return connection.define('textCampaigns', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    message: { type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    timeInitiated: { type: Sequelize.DATE, allowNull: true },
    status: { type: Sequelize.ENUM('Pending', 'Sent', 'Failed'), defaultValue: 'Pending', allowNull: false }
  }, { paranoid: true })
}

module.exports = TextCampaigns
