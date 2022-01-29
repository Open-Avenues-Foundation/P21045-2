module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('contacts', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      First_Name: { type: Sequelize.STRING, allowNull: false },
      Last_Name: { type: Sequelize.STRING, allowNull: false },
      Email: { type: Sequelize.STRING, allowNull: false },
      City: { type: Sequelize.STRING, allowNull: false },
      State: { type: Sequelize.STRING, allowNull: false },
      Phone_number: { type: Sequelize.INTEGER, allowNull: false },
      Last_Order_Price: { type: Sequelize.INTEGER, allowNull: false },
      Last_Order_Date: { type: Sequelize.DATE, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('textCampaigns', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      Message: { type: Sequelize.STRING, allowNull: false },
      Name: { type: Sequelize.STRING, allowNull: false },
      Time_Initiated: { type: Sequelize.DATE, allowNull: false },
      Status: { type: Sequelize.TINYINT, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },
    })

    return queryInterface.createTable('textMessages', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      contactId: { type: Sequelize.INTEGER, references: { model: 'contacts', key: 'id' } },
      textCampaignId: { type: Sequelize.INTEGER, references: { model: 'textCampaigns', key: 'id' } },
      Time_Sent: { type: Sequelize.DATE, allowNull: false },
      Status: { type: Sequelize.TINYINT, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },
    })
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('contacts')

    await queryInterface.dropTable('textCampaigns')

    return queryInterface.dropTable('textMessages')
  }
}
