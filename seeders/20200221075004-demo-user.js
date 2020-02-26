"use strict";

const date = new Date();
const dateTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "users",
      [
        {
          breeder: "abdul",
          email: "abduluye@gmail.com",
          password: "123",
          phone: "0812345678",
          address: "bogor",
          createdAt: dateTime,
          updatedAt: dateTime
        },
        {
          breeder: "jauhari",
          email: "jauhari@gmail.com",
          password: "123",
          phone: "0811111111",
          address: "london",
          createdAt: dateTime,
          updatedAt: dateTime
        },
        {
          breeder: "sukiyem",
          email: "sukiyem@gmail.com",
          password: "123",
          phone: "0812151213",
          address: "kroya",
          createdAt: dateTime,
          updatedAt: dateTime
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("users", null, {});
  }
};
