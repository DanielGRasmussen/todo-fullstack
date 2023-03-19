import "./css/SubTask.css";
import React from "react";
import { getTodoByIdFromLocal } from "../ExternalServices";

function SubTask(subtask, dataChange, setModalTodo): JSX.Element {
	let title = subtask.name;
	let subTaskTodo;
	if (subtask.link) {
		subTaskTodo = getTodoByIdFromLocal(subtask.id);
		title = subTaskTodo.title;
	}

	return (
		<li
			onClick={() => {
				if (subtask.link) {
					setModalTodo(subTaskTodo);
				}
			}}
			key={title}
			className={subtask.link ? "clickable" : ""}
		>
			{title}
		</li>
	);
}

export default SubTask;
