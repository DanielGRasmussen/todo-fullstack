import "./css/SubTask.css";
import React from "react";
import { deleteTodoById, getTodoByIdFromLocal } from "../ExternalServices";
import { ITodoData } from "../main/TodoList";

interface ISubTaskProps {
	subtask: { name: string; link: boolean; id: string };
	setModalTodo: React.Dispatch<React.SetStateAction<ITodoData>>;
	dataChange;
}

function SubTask({
	subtask,
	setModalTodo,
	dataChange
}: ISubTaskProps): JSX.Element {
	let title = subtask.name;
	let subTaskTodo;
	if (subtask.link) {
		subTaskTodo = getTodoByIdFromLocal(subtask.id);
		title = subTaskTodo.title;
	}

	function linkedClick(event) {
		if (event.target.checked) {
			// Will eventually move to create to do page.
			return;
		}
		subtask.link = false;
		subtask.name = subTaskTodo.title;
		deleteTodoById(subTaskTodo.id).then(() => {
			dataChange("", "", true);
			//fetchTodoList();
		});
	}

	return (
		<li
			onClick={(event) => {
				const clickedElement = event.target as HTMLElement;
				if (
					subTaskTodo &&
					clickedElement.tagName.toLowerCase() === "li"
				) {
					setModalTodo(subTaskTodo);
				}
			}}
			key={title}
			className={subtask.link ? "clickable" : ""}
		>
			<span className="linked">{"Linked: "}</span>
			<input
				type="checkbox"
				checked={subtask.link}
				onChange={linkedClick}
			/>
			{title}
		</li>
	);
}

export default SubTask;
