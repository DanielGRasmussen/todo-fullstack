import "./css/Modal.css";
import React, { useState } from "react";
import Dates from "./Dates";
import { checkPriorityValid, isDateFormatValid, sleep } from "../utils";
import SubTask from "./SubTask";
import {
	deleteTodoById,
	getTodoByIdFromLocal,
	saveTodo
} from "../ExternalServices";
import ITodoData from "../ITodoData";

export function Modal(
	isOpen: boolean,
	setIsOpen,
	create,
	todo,
	setModalTodo,
	fetchTodoList,
	startNotice,
	askConfirmation
) {
	const [change, setChange] = useState(false);

	function toggleModal() {
		if (isOpen) {
			const modalOverlay: Element =
				document.getElementById("modal-overlay");
			modalOverlay.classList.add("close");
			sleep(190).then(() => {
				document.querySelector("body").classList.remove("freeze");
				setIsOpen(false);
			});
			// Using an event listener is better and more maintainable but makes the modal reappear for a split second.
		} else {
			setIsOpen(true);
		}
	}

	function dataChange(newValue, dataType: string, forceUpdate = false) {
		// General dataChange function to reload the modal and pass on new data to db
		let value = newValue;
		// Validate data
		if (dataType === "priority") {
			if (!checkPriorityValid(newValue)) {
				return startNotice("error", "Invalid Priority Entry");
			}
		} else if (
			dataType === "proposedStartDate" ||
			dataType === "proposedEndDate"
		) {
			if (!isDateFormatValid(newValue)) {
				return startNotice("error", "Invalid Date");
			}
			value = new Date(value).toISOString();
		} else if (dataType === "title" && newValue === "") {
			return startNotice("error", "Invalid Title");
		} else if (dataType === "type" && newValue === "") {
			return startNotice("error", "Invalid Type");
		}
		if (
			todo[dataType] === value &&
			!forceUpdate &&
			!todo.recurring.isRecurring
		)
			return;

		todo[dataType] = value;
		todo.lastUpdated = new Date().toISOString();

		if (create) return startNotice("success", "Updated");
		if (todo.recurring.isRecurring) {
			if (
				dataType === "proposedStartDate" ||
				dataType === "proposedEndDate"
			)
				return;

			const realTodo = getTodoByIdFromLocal(todo.id);
			realTodo[dataType] = value;
			if (dataType === "status") {
				realTodo.recurring.completionStatus[todo.index].status = value;
				if (newValue === "in-progress")
					realTodo.recurring.completionStatus[
						todo.index
					].actualStart = new Date().toISOString();
				else if (newValue === "complete")
					realTodo.recurring.completionStatus[todo.index].actualEnd =
						new Date().toISOString();
			}
		}

		// Here we should place a call to external services to update db
		fetchTodoList();
		if (!forceUpdate) {
			startNotice("success", "Data Updated");
		}
		setChange(!change);
	}

	function deleteTodo() {
		function next() {
			// Deletes reference to this todo for the parent task.
			if (todo.parentTask) {
				const parent: ITodoData = getTodoByIdFromLocal(todo.parentTask);
				for (const subtask of parent.subTasks) {
					if (subtask.link && subtask.id === todo.id) {
						subtask.name = todo.title;
						subtask.link = false;
						subtask.id = "";
					}
				}
			}
			// Deletes linked subtasks
			for (const subtask of todo.subTasks) {
				if (subtask.link) {
					fetchTodoList(); // Error if this is gone.
					deleteTodoById(subtask.id);
				}
			}
			deleteTodoById(todo.id).then(() => {
				fetchTodoList();
			});
			startNotice("success", "Deleting Todo");
			toggleModal();
		}

		let askNext = next;
		if (create)
			askNext = () => {
				startNotice("success", "Canceling Todo creation");
				toggleModal();
			};

		const question = create
			? "Are you sure you want to cancel creation of this todo item?"
			: `Are you sure you want to permanently delete "${todo.title}" and all linked subtasks?`;
		askConfirmation(question, askNext);
	}

	function createTodo() {
		if (
			!(
				todo.title &&
				todo.priority &&
				todo.proposedStartDate &&
				todo.proposedEndDate
			)
		) {
			return startNotice("error", "All fields are required");
		}
		saveTodo(todo).then(() => {
			fetchTodoList();
		});
		startNotice("success", "Creating Todo");
		toggleModal();
	}

	function overlayClicked(event) {
		if (event.target.id === "modal-overlay") toggleModal();
	}

	function changeStatus(new_status: string) {
		if (new_status === "incomplete") {
			todo.actualStartDate = "";
			todo.actualEndDate = "";
		} else todo[buttonTextOpts[new_status][2]] = new Date().toISOString();

		dataChange(new_status, "status");
	}

	// Button text depending on status
	const buttonTextOpts = {
		incomplete: ["Start!", "in-progress", ""],
		"in-progress": ["Finish!", "complete", "actualStartDate"],
		complete: ["Restart?", "incomplete", "actualEndDate"]
	};

	if (!isOpen) return;
	document.querySelector("body").classList.add("freeze");
	return (
		<div id="modal-overlay" onClick={overlayClicked}>
			<div id="modal" className={create ? "create" : null}>
				<input
					type="text"
					defaultValue={todo.title}
					onBlur={(event) => {
						dataChange(event.target.value, "title");
					}}
					className="title"
				/>
				<img
					src={process.env.PUBLIC_URL + "/assets/close_x.svg"}
					alt="Close modal"
					onClick={toggleModal}
					id="close-modal"
				/>
				<img
					src={process.env.PUBLIC_URL + "/assets/trash.svg"}
					alt="Delete current todo"
					onClick={deleteTodo}
					id="delete-todo"
				/>
				<p className="type">
					<input
						type="text"
						defaultValue={todo.type}
						onBlur={(event) => {
							dataChange(event.target.value, "type");
						}}
					/>
				</p>
				<p className="priority">
					Priority:{" "}
					<input
						type="text"
						defaultValue={todo.priority}
						onBlur={(event) => {
							dataChange(event.target.value, "priority");
						}}
					/>
				</p>
				<Dates todo={todo} dataChange={dataChange} create={create} />
				<h3>Subtasks:</h3>
				<ul id="subtasks">
					{todo.subTasks.map((subtask) => (
						<SubTask
							subtask={subtask}
							setModalTodo={setModalTodo}
							dataChange={dataChange}
							startNotice={startNotice}
						/>
					))}
				</ul>
				<h3>Description:</h3>
				<textarea
					defaultValue={todo.description}
					onBlur={(event) => {
						dataChange(event.target.value, "description");
					}}
					id="description"
				></textarea>
				<button
					onClick={() => {
						if (create) {
							createTodo();
							return;
						}
						changeStatus(buttonTextOpts[todo.status][1]);
					}}
					id="progress"
				>
					{create ? "Save" : buttonTextOpts[todo.status][0]}
				</button>
			</div>
		</div>
	);
}
