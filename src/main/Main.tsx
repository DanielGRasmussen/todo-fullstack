import "./css/Main.css";
import React, { useState } from "react";
import TodoList from "./TodoList";
import Modal from "../modal/Modal";

function Main(): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const [modalTodo, setModalTodo] = useState({});

	return (
		<main tabIndex={-1}>
			<h1>To-Do</h1>
			{Modal(isOpen, setIsOpen, modalTodo, setModalTodo)}
			{TodoList(setIsOpen, setModalTodo)}
		</main>
	);
}

export default Main;
