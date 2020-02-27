const models = require("../models");
const Users = models.user;
const jwt = require("jsonwebtoken");
const Pay = models.payment;

//function decode jwt

const Model = require("../models");
const Payment = Model.payment;
const User = Model.user;
// const jwt = require("jsonwebtoken");

const { secretKey } = require("../config/secretKey");

// function decode jwt
const verifyJwt = jwtHeader => {
  let jwtData;
  let authorization = jwtHeader.split(" ")[1],
    decoded;
  try {
    decoded = jwt.verify(authorization, "my-secret-key");
    jwtData = {
      error: false,
      values: decoded
    };
  } catch (e) {
    jwtData = {
      error: true,
      values: null
    };
  }
  return jwtData;
};

//request premium payment

exports.payment = (req, res) => {
  const { no_rek, proof_of_transfer, status, user_id } = req.body;

  const inputPay = {
    no_rek,
    proof_of_transfer,
    status,
    user_id
  };
  console.log(inputPay);

  Pay.create(inputPay).then(bill => {
    if (bill) {
      Pay.findOne({
        where: {
          id: bill.id
        },
        attributes: ["no_rek", "proof_of_transfer", "status"],
        include: [
          {
            model: Users,
            attributes: [
              "id",
              "breeder",
              "address",
              "phone",
              "createdAt",
              "updatedAt"
            ]
          }
        ]
      }).then(billShow => {
        res.send(billShow);
      });
    }
  });
};

//confirmed premium by admin

exports.preUpdate = (req, res) => {
  const idPayment = req.params.id;
  const jwtData = verifyJwt(req.headers.authorization);
  console.log(idPayment);
  if (!jwtData.error) {
    console.log(idPayment, jwtData);
    Users.findOne({ where: { id: jwtData.values.userId } }).then(data => {
      console.log("###########");
      if (data) {
        Payment.update(req.body, { where: { id: idPayment } }).then(updated => {
          if (updated) {
            Payment.findOne({
              include: [
                {
                  model: Users,
                  attributes: ["id", "breeder", "address", "phone"]
                }
              ],
              where: { id: idPayment },
              attributes: ["id", "no_rek", "proof_of_transfer", "status"]
            }).then(respon => res.send(respon));
          }
        });
      } else {
        res.status(401).send({
          error: true,
          message: "Your Not Admin"
        });
      }
    });
  } else {
    res.status(401).send({
      error: true,
      message: "Error Not Authorized"
    });
  }
};
