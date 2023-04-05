import "./css/SubTask.css";
import React, { useState } from "react";
import { deleteTodoById, getTodoByIdFromLocal } from "../ExternalServices";
import ITodoData from "../DataInterfaces";

interface ISubTaskProps {
	subtask: { name: string; link: boolean; id: string };
	index: number;
	setModalTodo: React.Dispatch<React.SetStateAction<ITodoData>>;
	dataChange;
	startNotice;
	askConfirmation;
	setAddingSubtask?;
	newSubtask?: boolean;
}

function SubTask({
	subtask,
	index,
	setModalTodo,
	dataChange,
	startNotice,
	askConfirmation,
	setAddingSubtask,
	newSubtask
}: ISubTaskProps): JSX.Element {
	const [editing, setEditing] = useState(newSubtask);

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
			return;
		}
		subtask.link = false;
		subtask.name = subTaskTodo.title;
		subtask.id = "";
		startNotice("notice", "Deleting linked subtask.");
		dataChange("", "", true); // Updates the checkbox uncheck.
		deleteTodoById(subTaskTodo.id).then(() => {
			dataChange("", "", true); // Removes subtask from TodoList.
		});
	}

	function editSubtask() {
		if (editing) {
			const subtaskTitle: HTMLInputElement = document.getElementById(`subtaskTitle${index}`) as HTMLInputElement;
			if (subtaskTitle.value.length === 0) return startNotice("error", "Subtask title cannot be empty.");
			subtask.name = subtaskTitle.value;
			dataChange(subtask, "subtask", false, false, index);
		} else if (subtask.link) {
			setModalTodo(subTaskTodo);
		}
		setEditing(!editing);
		if (newSubtask) setAddingSubtask(false);
	}

	function deleteSubtask() {
		function next() {
			if (subtask.link) {
				return deleteTodoById(subtask.id);
			}
			dataChange("", "deleteSubtask", false, false, index);
		}

		askConfirmation("Are you sure you want to delete this subtask?", next);
	}

	return (
		<li>
			<>
				<span className="linked">{"Linked: "}</span>
				<input type="checkbox" checked={subtask.link} onChange={linkedClick} />
				{editing ? <input type="text" defaultValue={subtask.name} id={`subtaskTitle${index}`} autoComplete="off" /> : title}
				<img
					onClick={editSubtask}
					src={process.env.PUBLIC_URL + (editing ? "assets/save.svg" : "/assets/pencil.svg")}
					alt={editing ? "Save subtask" : "Edit subtask"}
					id="edit-subtask"
				/>
				<img
					onClick={deleteSubtask}
					src={process.env.PUBLIC_URL + "/assets/trash.svg"}
					alt={editing ? "Save subtask" : "Edit subtask"}
					id="delete-subtask"
				/>
			</>
		</li>
	);
}

export default SubTask;
