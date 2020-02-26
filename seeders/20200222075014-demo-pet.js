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
      "pets",
      [
        {
          name: "garaga",
          gender: "male",
          about_pet: "",
          photo: "",
          user_id: 1,
          species_id: 1,
          age_id: 1,
          createdAt: dateTime,
          updatedAt: dateTime
        },
        {
          name: "bejo",
          gender: "male",
          about_pet: "",
          photo: "",
          user_id: 2,
          species_id: 2,
          age_id: 2,
          createdAt: dateTime,
          updatedAt: dateTime
        },
        {
          name: "retno",
          gender: "female",
          about_pet: "",
          photo: "",
          user_id: 3,
          species_id: 3,
          age_id: 3,
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
  }
};
