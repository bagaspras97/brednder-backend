// instatiate express module
const express = require("express");
require("express-group-routes");

//use express in app variable
const app = express();

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

//GET list route: simply send arr of obj todos your user screen
app.group("/api/v1", router => {
  router.post("/login", AuthController.login);
  router.post("/register", AuthController.store);

  router.post("/species", AuthController.addSpecies);
  router.get("/species", AuthController.species);

  router.post("/pet", authenticated, PetController.insertPet);
  router.get("/pet", authenticated, PetController.getPets);
  router.put("/pet/:id", authenticated, PetController.updatePet);
  router.delete("/pet/:id", authenticated, PetController.deletePet);

  router.get("/pet/:id", AuthController.detailPet);

  router.get("/user/:id", authenticated, userController.getDetailUser);
  router.put("/user/:id", authenticated, userController.updateUser);
  router.delete("/user/:id", authenticated, userController.deleteUser);
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
