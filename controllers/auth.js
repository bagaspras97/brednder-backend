const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;
const Species = models.species;
const Pet = models.pet;
const Age = models.age;

exports.login = (req, res) => {
  //check if email and pass match in db tbl user
  const email = req.body.email;
  const password = req.body.password; //use encryption in real world case!
  User.findOne({ where: { email, password } }).then(user => {
    if (user) {
      const token = jwt.sign({ userId: user.id }, "my-secret-key");
      res.send({
        email,
        token
      });
    } else {
      res.send({
        error: true,
        message: "Wrong Email or Password!"
      });
    }
  });
};

exports.store = (req, res) => {
  try {
    const { breeder, email, password, phone, address } = req.body;
    // const { name, gender, about_pet } = req.body.pet;
    User.findOne({ where: { email } }).then(Email => {
      if (!Email) {
        User.create({
          breeder: breeder,
          email: email,
          password: password,
          phone: phone,
          address: address
        }).then(user => {
          Pet.create({
            name: req.body.pet.name,
            gender: req.body.pet.gender,
            about_pet: req.body.pet.about_pet,
            user_id: user.id,
            Species_id: req.body.pet.spesies.id,
            age_id: req.body.pet.age.id
          }).then(pet => {
            const token = jwt.sign({ userId: user.id }, "my-secret-key");
            res.status(200).send({
              status: 200,
              message: "success",
              email: User.email,
              token
            });
          });
        });
      } else {
        res.status(201).send({
          status: 201,
          message: "email is already in use",
          data: req.body
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      email: "unique",
      password: "unique",
      message: "Bad Request",
      data: req.body
    });
  }
};

exports.addSpecies = (req, res) => {
  Species.create(req.body).then(data => {
    res.send({
      message: "sukses",
      data
    });
  });
};

exports.species = (req, res) => {
  Species.findAll().then(showall => {
    res.send(showall);
  });
};

exports.detailPet = (req, res) => {
  const idPet = req.params.id;
  Pet.findOne({
    include: [
      {
        model: Species,
        attributes: ["id", "name"],
        as: "species"
      },
      {
        model: Age,
        attributes: ["id", "name"],
        as: "age"
      },
      {
        model: User,
        attributes: ["id", "breeder", "address", "phone"],
        as: "user"
      }
    ],
    where: { id: idPet },
    attributes: [
      "id",
      "name",
      "gender",
      "about_pet",
      "photo",
      "createdAt",
      "updatedAt"
    ]
  }).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(400).send({
        error: true,
        message: "Pet success update, errror get data pet details"
      });
    }
  });
};
