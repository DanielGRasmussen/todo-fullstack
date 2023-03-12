import "./App.css";
import React from "react";
import TodoList from "./TodoList";

function App() {
	document.title = "Main | To Do List";

	return (
		<main>
			<h1>To-Do</h1>
			<TodoList />
		</main>
	);
}

export default App;
