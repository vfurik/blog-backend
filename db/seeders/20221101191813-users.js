'use strict';

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(7);
  return await bcrypt.hash(password, salt);
};

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'admin@admin.com',
          password: await hashPassword('admin'),
          active: true,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
