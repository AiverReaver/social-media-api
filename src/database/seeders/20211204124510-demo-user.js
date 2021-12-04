"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "test1",
          email: "test1@test.ocm",
          password:
            "$2a$10$Ywg0fVeKFLBW3AvKsQKWCOOk9OihLJOhXaPEBV/Xh9BJ.ERhtUgwO", // "password"
          createdAt: "2021-12-03 17:38:58.282+05:30",
          updatedAt: "2021-12-03 17:38:58.282+05:30",
        },
        {
          name: "test2",
          email: "test2@test.ocm",
          password:
            "$2a$10$Ywg0fVeKFLBW3AvKsQKWCOOk9OihLJOhXaPEBV/Xh9BJ.ERhtUgwO", // "password"
          createdAt: "2021-12-03 17:38:58.282+05:30",
          updatedAt: "2021-12-03 17:38:58.282+05:30",
        },
        {
          name: "test3",
          email: "test3@test.ocm",
          password:
            "$2a$10$Ywg0fVeKFLBW3AvKsQKWCOOk9OihLJOhXaPEBV/Xh9BJ.ERhtUgwO", // "password"
          createdAt: "2021-12-03 17:38:58.282+05:30",
          updatedAt: "2021-12-03 17:38:58.282+05:30",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
