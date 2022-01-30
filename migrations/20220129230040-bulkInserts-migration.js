module.exports = {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert('contacts', [
      {
        email: 'enlightenedone@paikhuuok.com',
        firstName: 'Frank',
        lastName: 'Farrow',
        phoneNumber: '(202)-555-0140',
        city: 'Detroit',
        state: 'MI',
        lastOrderPrice: 26,
        lastOrderDate: '2021-04-17'
      },
      {
        email: 'willstclair@pickuplanet.com',
        firstName: 'Avneet',
        lastName: 'Hancock',
        phoneNumber: '(510)-555-0141',
        city: 'Plano',
        state: 'TX',
        lastOrderPrice: 62.99,
        lastOrderDate: '2021-08-25'
      },
      {
        email: 'jmarkovitch@songshnagu.com',
        firstName: 'Kester',
        lastName: 'Mcdermott',
        phoneNumber: '(657)-555-0184',
        city: 'Denver',
        state: 'CO',
        lastOrderPrice: 10,
        lastOrderDate: '2021-09-11'
      },
      {
        email: 'hellomedina@manlk.site',
        firstName: 'Anthony',
        lastName: 'Allison',
        phoneNumber: '(909)-555-0171',
        city: 'Milwaukee',
        state: 'WI',
        lastOrderPrice: 55,
        lastOrderDate: '2021-11-12'
      }
    ])

    await queryInterface.bulkInsert('textCampaigns', [
      { message: 'This is the first message', name: 'first message', timeInitiated: '2019-05-05', status: false },
      { message: 'This is the second message', name: 'second message', timeInitiated: '2020-06-06', status: true },
      { message: 'This is the third message', name: 'third message', timeInitiated: '2021-07-07', status: false },
      { message: 'This is the fourth message', name: 'fourth message', timeInitiated: '2022-08-08', status: true }
    ])

    return queryInterface.bulkInsert('textMessages', [
      { contactId: 1, textCampaignId: 1, timeSent: '2000-04-04 15:57:59.000', status: true },
      { contactId: 2, textCampaignId: 2, timeSent: '2001-04-04 15:57:59.000', status: false },
      { contactId: 3, textCampaignId: 3, timeSent: '2002-04-04 15:57:59.000', status: true },
      { contactId: 4, textCampaignId: 4, timeSent: '2003-04-04 15:57:59.000', status: false }
    ])
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.bulkDelete('contacts')

    await queryInterface.bulkDelete('textCampaigns')

    await queryInterface.bulkDelete('textMessages')
  }
}
