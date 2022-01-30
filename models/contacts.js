const Contacts = (connection, Sequelize) => {
  return connection.define('contacts', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING, allowNull: false },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    phoneNumber: { type: Sequelize.INTEGER, allowNull: false },
    city: { type: Sequelize.STRING, allowNull: false },
    state: { type: Sequelize.STRING, allowNull: false },
    lastOrderPrice: { type: Sequelize.INTEGER, allowNull: false },
    lastOrderDate: { type: Sequelize.DATE, allowNull: false }
  }, { paranoid: true })
}

module.exports = Contacts

