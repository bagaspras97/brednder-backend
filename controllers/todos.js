const Todo = require("../models").users;

exports.index = (req, res) => {
  Todo.findAll().then(todos => res.send(todos));
};

exports.show = (req, res) => {
  Todo.findOne({ where: { id: req.params.id } }).then(todo => res.send(todo));
};

exports.store = (req, res) => {
  Todo.create({ ...req.body, created_by: req.user.userId });
};

exports.update = (req, res) => {
  Todo.update(req.body, { where: { id: req.params.id } }).then(todo => {
    res.send({
      message: "success",
      todo
    });
  });
};

exports.destroy = (req, res) => {
  Todo.destroy({ where: { id: req.params.id } }).then(todo => {
    res.send({
      message: "success",
      todo
    });
  });
};
