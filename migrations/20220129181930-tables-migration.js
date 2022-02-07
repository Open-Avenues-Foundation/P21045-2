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
      email: { type: Sequelize.STRING, allowNull: false },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      phoneNumber: { type: Sequelize.STRING, allowNull: false },
      city: { type: Sequelize.STRING, allowNull: false },
      state: { type: Sequelize.STRING, allowNull: false },
      lastOrderPrice: { type: Sequelize.INTEGER, allowNull: false },
      lastOrderDate: { type: Sequelize.DATE, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('textCampaigns', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      message: { type: Sequelize.STRING, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      timeInitiated: { type: Sequelize.DATE, allowNull: true },
      status: { type: Sequelize.ENUM('Pending', 'Sent', 'Failed'), defaultValue: 'Pending', allowNull: false },
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
      timeSent: { type: Sequelize.DATE, allowNull: false },
      status: { type: Sequelize.ENUM('Pending', 'Sent', 'Failed'), defaultValue: 'Pending', allowNull: false },
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
