const Contacts = (connection, Sequelize) => {
  return connection.define('contacts', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    First_Name: { type: Sequelize.STRING, allowNull: false },
    Last_Name: { type: Sequelize.STRING, allowNull: false },
    Email: { type: Sequelize.STRING, allowNull: false },
    City: { type: Sequelize.STRING, allowNull: false },
    State: { type: Sequelize.STRING, allowNull: false },
    Phone_number: { type: Sequelize.INTEGER, allowNull: false },
    Last_Order_Price: { type: Sequelize.INTEGER, allowNull: false },
    Last_Order_Date: { type: Sequelize.DATE, allowNull: false }
  }, { paranoid: true })
}

module.exports = Contacts
