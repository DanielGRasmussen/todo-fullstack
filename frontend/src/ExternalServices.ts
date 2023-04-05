import ITodoData from "./DataInterfaces";
import axios from "axios";

let todos: ITodoData[] = [];

export async function getToDoList(): Promise<ITodoData[]> {
	const todoList = await axios.get("/api/todos", { maxRedirects: 0 });
	if (["http://localhost:3000/", "https://todo-fullstack-jppd.onrender.com/"].includes(todoList.request.responseURL))
		todos = [];
	else todos = todoList.data;
	return todos;
}

export function getTodoByIdFromLocal(id: string): ITodoData {
	for (const todoData of todos) {
		if (todoData._id === id) return todoData;
	}
}

export async function saveNewTodo(todoData: ITodoData): Promise<void> {
	await axios.post("/api/todos", todoData, { maxRedirects: 0 });
	return;
}

export async function saveTodo(todoData: ITodoData): Promise<void> {
	await axios.put(`/api/todos/${todoData._id}`, todoData, { maxRedirects: 0 });
	return;
}

export async function deleteTodoById(id: string): Promise<void> {
	await axios.delete(`/api/todos/${id}`, { maxRedirects: 0 });
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
	return userInfo;
}

export async function logout(): Promise<void> {
	await axios.get("/api/auth/logout)");
	return;
}
