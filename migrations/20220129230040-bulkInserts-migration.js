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
        lastName: 'Bethrico',
        phoneNumber: '(774) 287-2697',
        city: 'Detroit',
        state: 'MI',
        lastOrderPrice: 26,
        lastOrderDate: '2021-04-17'
      },
      {
        email: 'willstclair@pickuplanet.com',
        firstName: 'James',
        lastName: 'Olson',
        phoneNumber: '(978)-652-8789',
        city: 'Plano',
        state: 'TX',
        lastOrderPrice: 62.99,
        lastOrderDate: '2021-08-25'
      },
      {
        email: 'jmarkovitch@songshnagu.com',
        firstName: 'Catrina',
        lastName: 'Bethrico',
        phoneNumber: '(508)-826-4708',
        city: 'Denver',
        state: 'CO',
        lastOrderPrice: 10,
        lastOrderDate: '2021-09-11'
      },
      {
        email: 'toygame123@gmail.com',
        firstName: 'Ikponmwosa',
        lastName: 'Otasowie',
        phoneNumber: '(203)-565-3594',
        city: 'Milwaukee',
        state: 'WI',
        lastOrderPrice: 55,
        lastOrderDate: '2021-11-12'
      }
    ])

    await queryInterface.bulkInsert('textCampaigns', [
      { message: 'This is the first message', name: 'first message', timeInitiated: '2019-05-05' },
      { message: 'This is the second message', name: 'second message', timeInitiated: '2020-06-06' },
      { message: 'This is the third message', name: 'third message', timeInitiated: '2021-07-07' },
      { message: 'This is the fourth message', name: 'fourth message', timeInitiated: '2022-08-08' }
    ])

    return queryInterface.bulkInsert('textMessages', [
      { contactId: 1, textCampaignId: 1, timeSent: '2000-04-04 15:57:59.000' },
      { contactId: 2, textCampaignId: 2, timeSent: '2001-04-04 15:57:59.000' },
      { contactId: 3, textCampaignId: 3, timeSent: '2002-04-04 15:57:59.000' },
      { contactId: 4, textCampaignId: 4, timeSent: '2003-04-04 15:57:59.000' }
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
