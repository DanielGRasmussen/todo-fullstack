const express = require("express");
const router = express.Router();
const {
	getTodoList,
	createTodoItem,
	updateTodoItem,
	deleteTodoItem
} = require("../controllers/todoListController.js");
const { isAuthenticated } = require("../utils");

router.get("/", isAuthenticated, getTodoList);

router.post("/", isAuthenticated, createTodoItem);

router.put("/:id", isAuthenticated, updateTodoItem);

router.delete("/:id", isAuthenticated, deleteTodoItem);

module.exports = router;
