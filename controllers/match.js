const Model = require("../models");
const Pet = Model.pet;
const User = Model.user;
const Species = Model.species;
const Age = Model.age;
const Match = Model.match;

// exports.chekMatch = async (req, res) => {
exports.chekMatch = (req, res) => {
  //try {
  const q = req.query;
  Match.findOne({
    include: [
      {
        model: Pet,
        as: "pet",
        include: [
          {
            model: User
          },
          {
            model: Species
          }
        ]
      },
      {
        model: Pet,
        as: "pet_liked",
        include: [
          {
            model: User
          },
          {
            model: Species
          }
        ]
      }
    ],
    where: {
      pet_id: q.param1,
      pet_id_liked: q.param2
    }
  }).then(data => {
    res.send({
      id: data.id,
      status: data.status,
      pet: {
        id: data.pet.id,
        name: data.pet.name,
        gender: data.pet.gender,
        species: {
          id: data.pet.species.id,
          name: data.pet.species.name
        },
        age: data.pet.ages,
        users: {
          id: data.pet.user.id,
          name: data.pet.user.name,
          address: data.pet.user.address,
          phone: data.pet.user.phone
        },
        about_pet: data.pet.about_pet,
        photo: data.pet.photo
      },
      pet_liked: {
        id: data.pet_liked.id,
        name: data.pet_liked.name,
        gender: data.pet_liked.gender,
        species: {
          id: data.pet_liked.species.id,
          name: data.pet_liked.species.name
        },
        users: {
          id: data.pet_liked.user.id,
          name: data.pet_liked.user.name,
          address: data.pet_liked.user.address,
          phone: data.pet_liked.user.phone
        },
        about_pet: data.pet_liked.about_pet,
        photo: data.pet_liked.photo
      }
    });
  });
  //     } catch (error) {
  //         res.status(404).send({
  //             Message: "204 notFound"
  //         });
  //     }
};

exports.createMatch = (req, res) => {
  const { pet_id, pet_id_liked, status } = req.body;

  const creMatch = {
    pet_id,
    pet_id_liked,
    status
  };

  console.log(creMatch);

  Match.create(creMatch).then(pet => {
    if (pet) {
      Match.findOne({
        include: [
          {
            model: Pet,
            as: "pet",
            include: [
              {
                model: User
              },
              {
                model: Species
              }
            ]
          },
          {
            model: Pet,
            as: "pet_liked",
            include: [
              {
                model: User
              },
              {
                model: Species
              }
            ]
          }
        ],
        where: {
          id: pet.id
        }
      }).then(pets => {
        //console.log(pet2)
        res.send({
          id: pets.id,
          status: pets.status,
          pet: {
            id: pets.pet.id,
            name: pets.pet.name,
            gender: pets.pet.gender,
            species: {
              id: pets.pet.species.id,
              name: pets.pet.species.name
            },
            age: pets.pet.ages,
            users: {
              id: pets.pet.user.id,
              name: pets.pet.user.breednder,
              address: pets.pet.user.address,
              phone: pets.pet.user.phone
            },
            about_pet: pets.pet.about_pet,
            photo: pets.pet.photo
          },
          pet_liked: {
            id: pets.pet_liked.id,
            name: pets.pet_liked.name,
            gender: pets.pet_liked.gender,
            species: {
              id: pets.pet_liked.species.id,
              name: pets.pet_liked.species.name
            },
            age: pets.pet_liked.ages,
            user: {
              id: pets.pet_liked.user.id,
              name: pets.pet_liked.user.breednder,
              address: pets.pet_liked.user.address,
              phone: pets.pet_liked.user.phone
            },
            about_pet: pets.pet_liked.about_pet,
            photo: pets.pet_liked.user.photo
          },
          createdAt: pets.createdAt,
          updatedAt: pets.updatedAt
        });
      });
    } else {
      res.status(400).send({
        error: true,
        message: "Error Add Data Match"
      });
    }
  });
};

exports.dataMath = async (req, res) => {
  try {
    const q = req.query;
    if (q.param2 == "true") stat = 1;
    else stat = 0;

    const data2 = await Match.findOne({
      where: {
        pet_id: q.param1,
        status: stat
      },
      include: [
        {
          model: Pet,
          as: "pet",
          include: [
            {
              model: User
            },
            {
              model: Species
            }
          ]
        },
        {
          model: Pet,
          as: "pet_liked",
          include: [
            {
              model: User
            },
            {
              model: Species
            }
          ]
        }
      ]
    });
    if (data2) {
      res.send({
        //   data2
        id: data2.id,
        status: data2.status,
        pet: {
          id: data2.pet.id,
          name: data2.pet.name,
          gender: data2.pet.gender,
          spesies: {
            id: data2.pet.species.id,
            name: data2.pet.species.name
          },
          user: {
            id: data2.pet.user.id,
            name: data2.pet.user.name,
            address: data2.pet.user.address,
            phone: data2.pet.user.phone
          },
          about_pet: data2.pet.about_pet,
          photo: data2.pet.photo
        },
        pet_liked: {
          id: data2.pet_liked.id,
          name: data2.pet_liked.name,
          gender: data2.pet_liked.gender,
          spesies: {
            id: data2.pet_liked.species.id,
            name: data2.pet_liked.species.name
          },
          user: {
            id: data2.pet_liked.user.id,
            name: data2.pet_liked.user.name,
            address: data2.pet_liked.user.address,
            phone: data2.pet_liked.user.phone
          },
          about_pet: data2.pet.about_pet,
          photo: data2.pet.photo
        },
        createdAt: data2.createdAt,
        updatedAt: data2.updatedAt
      });
    } else {
      res.status(402).send({
        Message: "No Match"
      });
    }
  } catch (error) {
    res.status(400).send({
      Message: "Bad request"
    });
  }
};
