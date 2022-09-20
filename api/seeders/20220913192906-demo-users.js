module.exports = {
  up: (queryInterface, Sequelize) => {
         return queryInterface.bulkInsert('users', [
        {
          email: 'mau@mau.com',
          password: 'ytkx',
          first_name: "Mauricio",
          last_name: "Yang",
          age: 27,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'fer@fer.com',
          password: 'cgot',
          first_name: "Fernando",
          last_name: "Augusto",
          age: 51,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'tieni@tieni.com',
          password: 'pvlb',
          first_name: "Luiz",
          last_name: "Tieni",
          age: 27,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};