import "./css/Main.css";
import React from "react";
import TodoList from "./TodoList";

function Main() {
	document.title = "Main | To Do List";

	return (
		<main tabIndex={-1}>
			<h1>To-Do</h1>
			<TodoList />
		</main>
	);
}

export default Main;
