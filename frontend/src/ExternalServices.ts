import ITodoData from "./DataInterfaces";
import axios from "axios";

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

export async function saveNewTodo(todoData: ITodoData): Promise<void> {
	await axios.post("/api/todos", todoData, { maxRedirects: 0 });
	// const todoList = JSON.parse(sessionStorage.getItem("todos"));
	// todoList.push(todoData);
	// sessionStorage.setItem("todos", JSON.stringify(todoList));
	return;
}

export async function saveTodo(todoData: ITodoData): Promise<void> {
	await axios.put(`/api/todos/${todoData._id}`, todoData, { maxRedirects: 0 });
	// const todoList = JSON.parse(sessionStorage.getItem("todos")) as ITodoData[];
	// for (let todoItem of todoList) {
	// 	if (todoItem._id === todoData._id) {
	// 		todoItem = todoData;
	// 		sessionStorage.setItem("todos", JSON.stringify(todoList));
	// 		break;
	// 	}
	// }
	return;
}

export async function deleteTodoById(id: string): Promise<void> {
	await axios.delete(`/api/todos/${id}`, { maxRedirects: 0 });
	const todoList = JSON.parse(sessionStorage.getItem("todos")) as ITodoData[];
	for (let i = 0; i < todoList.length; i++) {
		if (todoList[i]._id === id) {
			todoList.splice(i, 1);
			sessionStorage.setItem("todos", JSON.stringify(todoList));
			break;
		}
	}
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
	return userInfo;
}

export async function logout(): Promise<void> {
	await axios.get("/api/auth/logout)");
	sessionStorage.removeItem("userInfo");
	sessionStorage.removeItem("todos");
	return;
}
