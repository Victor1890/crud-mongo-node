const { Router } = require("express");
const router = Router();
const Task = require("../models/Task");

// Index pages
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.render("index", {
    tasks,
  });
});

// Add form to server
router.post("/add", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect("/");
});

// finaly task by id
router.get("/trun/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.status = !task.status;
  await task.save();
  res.redirect("/");
});

// Data get info
router.get("/edit/:id", async (req, res) => {
  const tasks = await Task.findById(req.params.id);
  res.render("edit", {
    tasks,
  });
});

// Change info
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  await Task.update({ _id: id }, req.body);
  res.redirect("/");
});

// Delete task by id
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Task.remove({ _id: id });
  res.redirect("/");
});

module.exports = router;
