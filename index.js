// instatiate express module
const express = require("express");
require("express-group-routes");
const cors = require("cors");

//use express in app variable
const app = express();

//cors
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

//init bodyParser
const bodyParser = require("body-parser");

//define the server port
const port = process.env.PORT || 3500;

//allow this app to receive incoming json request
app.use(bodyParser.json());

//create the homepage root
app.get("/", (req, res) => {
  //res means response, and it send string "Hello Express!" to the API
  res.send("Hello Express!");
});

//when this nodejs app executed, it will listen to defined port
// app.listen(port, () => console.log(`Listening on port ${port}!`))

//make hardcoded array of obj todos
//import the controller
// const TodosController = require("./controllers/todos");
const { authenticated } = require("./middleware");
const PetController = require("./controllers/pet");
const AuthController = require("./controllers/auth");
const userController = require("./controllers/user");
const Payments = require("./controllers/payment");
const Match = require("./controllers/match");

//GET list route: simply send arr of obj todos your user screen
app.group("/api/v1", router => {
  router.post("/login", AuthController.login);
  router.post("/register", AuthController.store);
  //species
  router.post("/species", AuthController.addSpecies);
  router.get("/species", AuthController.species);
  //pet
  router.post("/pet", authenticated, PetController.insertPet);
  router.get("/pet", authenticated, PetController.getPets);
  router.put("/pet/:id", authenticated, PetController.updatePet);
  router.delete("/pet/:id", authenticated, PetController.deletePet);
  //detailpet
  router.get("/pet/:id", AuthController.detailPet);
  //user
  router.get("/user/:id", authenticated, userController.getDetailUser);
  router.put("/user/:id", authenticated, userController.updateUser);
  router.delete("/user/:id", authenticated, userController.deleteUser);
  //payment
  router.post("/payments", authenticated, Payments.payment);
  router.put("/admin/:id", authenticated, Payments.preUpdate);
  //match
  router.get("/checkMatch", authenticated, Match.chekMatch);
  router.post("/createMatch", authenticated, Match.createMatch);
  router.get("/checkAllMatch", Match.dataMath);

  //   // app.get("/todos", authenticated, TodosController.index);
  //   // //GET detail route: receive json body request, from user input, then push to todos array
  //   // app.get("/todo/:id", authenticated, TodosController.show);
  //   // //POST route: receive json body request, from user input, then push to todos array
  //   // app.post("/todo", authenticated, TodosController.store);
  //   // //PATCH route: receive json body request, from user input, then push to todos array by obj id
  //   // app.put("/todo/:id", authenticated, TodosController.update);
  //   // //DELETE route: delete the todo obj, by received id request paramas
  //   // app.delete("/todo/:id", authenticated, TodosController.destroy);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
