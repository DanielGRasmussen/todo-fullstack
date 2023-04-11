import ITodoData from "./DataInterfaces";
import axios from "axios";
import { sleep } from "./utils";

export async function getToDoList(): Promise<ITodoData[]> {
	const response = await axios.get("/api/todos", { maxRedirects: 0 });
	let todoList: ITodoData[] = response.data;
	if (
		["http://localhost:3000/", "https://todo-fullstack-jppd.onrender.com/"].includes(response.request.responseURL)
	) {
		todoList = [];
		sessionStorage.setItem("todos", JSON.stringify(todoList));
	} else sessionStorage.setItem("todos", JSON.stringify(todoList));
	return todoList;
}

export function getTodoByIdFromLocal(id: string): ITodoData {
	for (const todoData of JSON.parse(sessionStorage.getItem("todos")) as ITodoData[]) {
		if (todoData._id === id) return todoData;
	}
}

let isExecuting = false;
export async function saveNewTodo(todoData: ITodoData): Promise<void> {
	if (isExecuting) {
		await sleep(1000);
		return saveNewTodo(todoData);
	}
	isExecuting = true; // Got to prevent a race condition

	const sessionData = sessionStorage.getItem("todos");
	let todos = [];
	if (sessionData) {
		try {
			todos = JSON.parse(sessionData);
		} catch (error) {
			console.error("Error parsing session data:", error);
		}
	}
	todos.push(todoData);
	sessionStorage.setItem("todos", JSON.stringify(todos));

	await axios.post("/api/todos", todoData, { maxRedirects: 0 });
	isExecuting = false;
	return;
}

export async function saveTodo(todoData: ITodoData): Promise<void> {
	if (isExecuting) {
		await sleep(1000);
		return saveTodo(todoData);
	}
	isExecuting = true; // Got to prevent a race condition

	const sessionData = sessionStorage.getItem("todos");
	let todos = [];
	if (sessionData) {
		try {
			todos = JSON.parse(sessionData);
		} catch (error) {
			console.error("Error parsing session data:", error);
		}
	}
	// Modify the object in the array that matches the _id property of todoData
	const todoIndex = todos.findIndex((todo) => todo._id === todoData._id);
	if (todoIndex !== -1) todos[todoIndex] = todoData;

	sessionStorage.setItem("todos", JSON.stringify(todos));
	await axios.put(`/api/todos/${todoData._id}`, todoData, { maxRedirects: 0 });
	isExecuting = false;
	return;
}

export async function deleteTodoById(id: string): Promise<void> {
	if (isExecuting) {
		await sleep(1000);
		return deleteTodoById(id);
	}
	isExecuting = true; // Got to prevent a race condition

	const sessionData = sessionStorage.getItem("todos");
	let todos = [];
	if (sessionData) {
		try {
			todos = JSON.parse(sessionData);
		} catch (e) {
			console.error("Error parsing session data:", e);
		}
	}

	// Find the index of the object in the array that matches the id and delete it
	const todoIndex = todos.findIndex((t) => t._id === id);
	if (todoIndex !== -1) todos.splice(todoIndex, 1);
	sessionStorage.setItem("todos", JSON.stringify(todos));

	await axios.delete(`/api/todos/${id}`, { maxRedirects: 0 });
	isExecuting = false;
	return;
}

export async function getUserInfo(): Promise<{
	googleId: string;
	_id: string;
	name: string;
	email: string;
	picture: string;
}> {
	const response = await axios.get(`/api/user`, { maxRedirects: 0 });
	let userInfo;
	if (["http://localhost:3000/", "https://todo-fullstack-jppd.onrender.com/"].includes(response.request.responseURL))
		userInfo = {
			googleId: "",
			_id: "",
			name: "",
			email: "",
			picture: process.env.PUBLIC_URL + "/images/default-profile-picture.png"
		};
	else userInfo = response.data;
	sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
	isExecuting = false;
	return userInfo;
}

export async function logout(): Promise<void> {
	sessionStorage.removeItem("userInfo");
	sessionStorage.removeItem("todos");
	await axios.get("/api/auth/logout)");
	return;
}
