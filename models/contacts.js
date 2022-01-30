const Contacts = (connection, Sequelize) => {
  return connection.define('testTables', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    Email: { type: Sequelize.STRING, allowNull: false },
    First_Name: { type: Sequelize.STRING, allowNull: false },
    Last_Name: { type: Sequelize.STRING, allowNull: false },
    Phone_number: { type: Sequelize.STRING, allowNull: false },
    City: { type: Sequelize.STRING, allowNull: false },
    State: { type: Sequelize.STRING, allowNull: false },
    Last_Order_Price: { type: Sequelize.DECIMAL(13, 2), allowNull: false },
    Last_Order_Date: { type: Sequelize.DATEONLY, allowNull: false }
  }, { paranoid: true })
}

module.exports = Contacts

