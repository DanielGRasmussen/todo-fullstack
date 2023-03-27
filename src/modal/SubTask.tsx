import "./css/SubTask.css";
import React from "react";
import { deleteTodoById, getTodoByIdFromLocal } from "../ExternalServices";
import ITodoData from "../ITodoData";

interface ISubTaskProps {
	subtask: { name: string; link: boolean; id: string };
	setModalTodo: React.Dispatch<React.SetStateAction<ITodoData>>;
	dataChange;
	startNotice;
}

function SubTask({
	subtask,
	setModalTodo,
	dataChange,
	startNotice
}: ISubTaskProps): JSX.Element {
	let title = subtask.name;
	let subTaskTodo;
	if (subtask.link) {
		subTaskTodo = getTodoByIdFromLocal(subtask.id);
		if (subTaskTodo) {
			title = subTaskTodo.title;
			subtask.name = title;
		}
	}

	function linkedClick(event) {
		if (event.target.checked) {
			// Will eventually move to create to do page.
			return;
		}
		subtask.link = false;
		subtask.name = subTaskTodo.title;
		startNotice("notice", "Deleting linked subtask.");
		dataChange("", "", true); // Updates the checkbox uncheck.
		deleteTodoById(subTaskTodo.id).then(() => {
			dataChange("", "", true); // Removes subtask from TodoList.
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
			className={subtask.link ? "clickable" : null}
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
