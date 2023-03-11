import React, { useState, useEffect } from "react";
import { getToDoList } from "./ExternalServices";

export interface ITodoData {
	created: string;
	proposedStartDate: string;
	actualStartDate: string;
	proposedEndDate: string;
	actualEndDate: string;
	title: string;
	description: string;
	type: string;
	subTasks: string[];
	priority: string;
	status: string;
	lastUpdated: string;
}

interface TodoElementProps {
	todo: ITodoData;
}

function TodoElement({ todo }: TodoElementProps) {
	return (
		<li className={`todo-item ${todo.status} ${todo.type}`}>
			<h3>{todo.title}</h3>
			<p className="priority">Priority: {todo.priority}</p>
			<p className="completion-date">
				Completion date:{" "}
				{new Date(todo.proposedEndDate).toLocaleString("en-US", {
					month: "numeric",
					day: "numeric",
					year: "numeric",
					hour: "numeric",
					minute: "numeric",
					hour12: true
				})}
			</p>
			<p className="description">{todo.description}</p>
		</li>
	);
}

function TodoList() {
	const [todoList, setTodoList] = useState<ITodoData[]>([]);

	useEffect(() => {
		const fetchTodoList = async () => {
			const fetchedList = await getToDoList();
			setTodoList(fetchedList);
		};
		fetchTodoList();
	}, []);

	return (
		<ul id="todos" className="grid">
			{todoList.map((todo) => (
				<TodoElement key={todo.created} todo={todo} />
			))}
		</ul>
	);
}

export default TodoList;
