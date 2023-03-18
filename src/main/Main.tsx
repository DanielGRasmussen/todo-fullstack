import "./css/Main.css";
import React, { useState } from "react";
import TodoList from "./TodoList";
import Modal from "./Modal";

function Main() {
	document.title = "Main | To Do List";
	const [isOpen, setIsOpen] = useState(false);
	const [modalTodo, setModalTodo] = useState({});

	return (
		<main tabIndex={-1}>
			<h1>To-Do</h1>
			{Modal(isOpen, setIsOpen, modalTodo)}
			{TodoList(setIsOpen, setModalTodo)}
		</main>
	);
}

export default Main;
