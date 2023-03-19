import React from "react";
import { getTodoByIdFromLocal } from "../ExternalServices";

function SubTask(subtask, dataChange): JSX.Element {
	let title = subtask.name;
	if (subtask.link) {
		const subTaskTodo = getTodoByIdFromLocal(subtask.id);
		title = subTaskTodo.title;
	}

	return (
		<li
			onClick={(event) => {
				dataChange(event, "subtask");
			}}
		>
			{title}
		</li>
	);
}

export default SubTask;
