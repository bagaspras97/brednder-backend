const model = require("../models");
const Pet = model.pet;
const User = model.user;
const Spesies = model.species;
const Age = model.age;

// --- add pet
exports.insertPet = (req, res) => {
  // const token = req.headers.authorization;
  const userId = req.body.user.id;
  const spesiesId = req.body.spesies.id;
  const ageId = req.body.age.id;
  const dataPet = {
    name: req.body.name,
    gender: req.body.gender,
    aboutpet: req.body.about_pet,
    photo: req.body.photo,
    user_id: userId,
    spesies_id: spesiesId,
    age_id: ageId
  };
  Pet.create(dataPet).then(resPet => {
    User.findOne({ where: { id: userId } }).then(userData => {
      Spesies.findOne({ where: { id: spesiesId } }).then(spesiesData => {
        Age.findOne({ where: { id: ageId } }).then(ageData => {
          const resDataCok = {
            id: resPet.id,
            name: resPet.name,
            ageData,
            spesiesData,
            aboutpet: resPet.aboutpet,
            photo: resPet.photo,
            userData
          };
          res.send({
            message: "Successs",
            resDataCok
          });
        });
      });
    });
  });
};

//Get All
exports.getPets = (req, res) => {
  Pet.findAll({
    attributes: [
      "id",
      "name",
      "gender",
      "about_pet",
      "photo",
      "createdAt",
      "updatedAt"
    ],
    include: [
      { model: Spesies, attributes: ["name"] },
      { model: Age, attributes: ["name"] },
      { model: User, attributes: ["id", "breeder", "address", "phone"] }
    ]
  }).then(pets => {
    res.send({ pets });
  });
};

//Update
exports.updatePet = (req, res) => {
  const id = req.params.id;
  const {
    name,
    gender,
    aboutpet,
    photo,
    spesies_id,
    age_id,
    user_id
  } = req.body;
  const data = {
    name,
    gender,
    aboutpet,
    photo,
    spesies_id,
    age_id,
    user_id
  };
  // console.log(data);
  Pet.update(data, { where: { id: id } }).then(DataPet => {
    // res.send({
    //   DataPet
    // });
    if (DataPet) {
      Pet.findOne({
        where: { id: id },
        include: [
          { model: Spesies, attributes: ["id", "name"] },
          { model: Age, attributes: ["id", "name"] },
          { model: User, attributes: ["id", "breeder", "address", "phone"] }
        ]
      }).then(data => {
        res.send({
          data
        });
      });
    }
  });
};

//Delete
exports.deletePet = (req, res) => {
  const Id = req.params.id;
  Pet.destroy({ where: { Id } }).then(Delpet => {
    if (Delpet) {
      res.send({
        message: "success",
        Delpet
      });
    } else {
      res.send({ status: "404", message: "not found" });
    }
  });
};
