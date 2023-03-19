import "./css/Main.css";
import React, { useEffect, useState } from "react";
import { ITodoData, TodoList } from "./TodoList";
import Modal from "../modal/Modal";
import { getToDoList } from "../ExternalServices";

function Main(): JSX.Element {
	const [todoList, setTodoList] = useState<ITodoData[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [modalTodo, setModalTodo] = useState({});

	async function fetchTodoList(): Promise<void> {
		const fetchedList: ITodoData[] = await getToDoList();
		setTodoList(fetchedList);
	}

	useEffect(() => {
		fetchTodoList();
	}, []);

	return (
		<main tabIndex={-1}>
			<h1>To-Do</h1>
			{Modal(isOpen, setIsOpen, modalTodo, setModalTodo, fetchTodoList)}
			{TodoList(setIsOpen, setModalTodo, todoList)}
		</main>
	);
}

export default Main;
