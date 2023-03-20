import "./css/SubTask.css";
import React from "react";
import { deleteTodoById, getTodoByIdFromLocal } from "../ExternalServices";
import { cleanUserInput, restoreUserInput } from "../utils";

function SubTask(subtask, fetchTodoList, setModalTodo): JSX.Element {
	let title = restoreUserInput(subtask.name);
	let subTaskTodo;
	if (subtask.link) {
		subTaskTodo = getTodoByIdFromLocal(subtask.id);
		title = restoreUserInput(subTaskTodo.title);
	}

	function linkedClick(event) {
		if (event.target.checked) {
			// Will eventually move to create to do page.
			return;
		}
		subtask.link = false;
		subtask.name = cleanUserInput(subTaskTodo.title);
		deleteTodoById(subTaskTodo.id).then(() => {
			fetchTodoList();
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
