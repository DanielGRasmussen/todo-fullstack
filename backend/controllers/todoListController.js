const User = require("../models/user");
const { getChecks } = require("../utils");
const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../encryption");

exports.getTodoList = async function (req, res) {
	try {
		// Find all todo items from the database
		const userId = req.user._id;
		const user = await User.findById(userId);
		const todoList = user.todoList;
		const copyTodoList = JSON.parse(JSON.stringify(todoList));
		copyTodoList.forEach((todo) => {
			todo.title = decrypt(todo.title);
			todo.description = decrypt(todo.description);
			todo.type = decrypt(todo.type);
			todo.subTasks.forEach((task) => {
				task.name = decrypt(task.name);
				delete task._id;
				return task;
			});
		});
		res.json(copyTodoList);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
};

exports.createTodoItem = async function (req, res) {
	try {
		let {
			title,
			description,
			type,
			subTasks,
			parentTask,
			recurring,
			priority,
			proposedStartDate,
			proposedEndDate
		} = req.body;
		title = encrypt(title.trim());
		description = encrypt(description.trim());
		type = encrypt(type.trim());
		subTasks = subTasks.map((subTask) => {
			subTask.name = encrypt(subTask.name.toString().trim());
			return subTask;
		});

		// Validate data
		const checks = getChecks(req.body, recurring && recurring.isRecurring);
		if (subTasks && subTasks.length) {
			for (const subTask of subTasks) {
				if (!subTask.name || subTask.name.toString().trim() === "") {
					return res.status(400).json({ error: "Subtasks title cannot be empty" });
				}
				if (subTask.link && !mongoose.Types.ObjectId.isValid(subTask.id)) {
					return res.status(400).json({ error: "Invalid subtask id" });
				}
			}
		}

		const error = checks.find((check) => check.check);
		if (error) {
			return res.status(400).json({ error: error.message });
		}

		// Update DB
		const todoItem = {
			created: new Date().toISOString(),
			proposedStartDate,
			actualStartDate: "",
			proposedEndDate,
			actualEndDate: "",
			title,
			description,
			type,
			subTasks,
			parentTask,
			recurring,
			priority,
			status: "incomplete",
			lastUpdated: new Date().toISOString()
		};

		const user = req.user;
		user.todoList.push(todoItem);
		const data = await user.save();
		res.status(201).json({ _id: data._id });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to create todo item" });
	}
};

exports.updateTodoItem = async function (req, res) {
	try {
		// validate data
		let {
			title,
			description,
			type,
			subTasks,
			parentTask,
			recurring,
			priority,
			status,
			proposedStartDate,
			actualStartDate,
			proposedEndDate,
			actualEndDate
		} = req.body;
		title = encrypt(title.trim());
		description = encrypt(description.trim());
		type = encrypt(type.trim());
		subTasks = subTasks.map((subTask) => {
			subTask.name = encrypt(subTask.name.toString().trim());
			return subTask;
		});

		const checks = getChecks(req.body, recurring && recurring.isRecurring);
		if (subTasks && subTasks.length) {
			for (const subTask of subTasks) {
				if (!subTask.name || subTask.name.toString().trim() === "") {
					return res.status(400).json({ error: "Subtasks title cannot be empty" });
				}
				if (subTask.link && !mongoose.Types.ObjectId.isValid(subTask.id)) {
					return res.status(400).json({ error: "Invalid subtask id" });
				}
			}
		}

		const error = checks.find((check) => check.check);
		if (error) {
			return res.status(400).json({ error: error.message });
		}
		// find the user and todo item to be updated
		const todoId = req.params.id;
		const userId = req.user._id;

		const user = await User.findById(userId);
		const todoItemIndex = user.todoList.findIndex((item) => item._id.toString() === todoId);

		// check if the todo item exists
		if (todoItemIndex === -1) {
			return res.status(404).json({ message: "Todo item not found" });
		}

		// update the todo item with the new values
		// update the user's todoList
		user.todoList[todoItemIndex] = {
			title: title,
			description: description,
			type: type,
			subTasks: subTasks,
			parentTask: parentTask,
			recurring: recurring,
			priority: priority,
			created: user.todoList[todoItemIndex].created,
			proposedStartDate: proposedStartDate,
			proposedEndDate: proposedEndDate,
			actualStartDate: actualStartDate,
			actualEndDate: actualEndDate,
			status: status,
			lastUpdated: new Date().toISOString()
		};
		const data = await user.save();
		res.status(200).json({ _id: data._id });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

exports.deleteTodoItem = async function (req, res) {
	try {
		const todoId = req.params.id;
		const userId = req.user._id;
		console.log(todoId);

		// find the user and remove the todo item from their todoList
		const user = await User.findByIdAndUpdate(
			userId,
			{ $pull: { todoList: { _id: todoId } } },
			{ new: true }
		);

		// check if the todo item was successfully removed
		if (!user) {
			return res.status(404).json({ message: "Todo item not found" });
		}

		res.status(200).json({ message: "Todo item deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};
