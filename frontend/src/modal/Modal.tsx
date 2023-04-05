import "./css/Modal.css";
import React, { useState } from "react";
import Dates from "./Dates";
import { checkPriorityValid, isDateFormatValid, sleep } from "../utils";
import SubTask from "./SubTask";
import { deleteTodoById, getTodoByIdFromLocal, saveNewTodo, saveTodo } from "../ExternalServices";
import ITodoData from "../DataInterfaces";
import Recurring from "./Recurring";

interface IModalProps {
	isOpen: boolean;
	setIsOpen;
	create;
	todo;
	setModalTodo;
	fetchTodoList;
	startNotice;
	askConfirmation;
}

export function Modal({
	isOpen,
	setIsOpen,
	create,
	todo,
	setModalTodo,
	fetchTodoList,
	startNotice,
	askConfirmation
}: IModalProps) {
	const [change, setChange] = useState(false);
	const [recurringOpen, setRecurringOpen] = useState(false);
	const [addingSubtask, setAddingSubtask] = useState(false);
	if (!isOpen) return;

	function toggleModal() {
		if (isOpen) {
			const modalOverlay: Element = document.getElementById("modal-overlay");
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

	function dataChange(newValue, dataType: string, forceUpdate = false, recurring = false, subtaskIndex = -1) {
		// General dataChange function to reload the modal and pass on new data to db
		let value = newValue;
		// Validate data
		if (dataType === "priority") {
			if (!checkPriorityValid(newValue)) {
				return startNotice("error", "Invalid Priority Entry");
			}
		} else if (dataType === "proposedStartDate" || dataType === "proposedEndDate") {
			if (!isDateFormatValid(newValue)) {
				return startNotice("error", "Invalid Date");
			}
			value = new Date(value).toISOString();
		} else if (dataType === "title" && newValue === "") {
			return startNotice("error", "Invalid Title");
		} else if (dataType === "type" && newValue === "") {
			return startNotice("error", "Invalid Type");
		}
		if (todo[dataType] === value && !forceUpdate && !todo.recurring.isRecurring) return;

		if (dataType === "subtask") todo.subTasks[subtaskIndex] = value;
		else if (dataType === "deleteSubtask") todo.subTasks.splice(subtaskIndex, 1);
		else if (todo.recurring.isRecurring || recurring) {
			// Gets real todo data since the current todo would be a generated version
			let realTodo = getTodoByIdFromLocal(todo._id);
			if (create) realTodo = todo;

			if (dataType === "isRecurring") {
				if (value && !realTodo.recurring.completionStatus) {
					realTodo.recurring.completionStatus = [
						{
							status: "incomplete",
							actualStart: "",
							actualEnd: ""
						}
					];
				}
				if (todo.recurring.isRecurring !== value && !create) toggleModal();
				todo.recurring.isRecurring = value;

				if (!value) {
					realTodo.proposedStartDate = realTodo.recurring.duration.start;
					realTodo.proposedStartDate = new Date(
						new Date(realTodo.recurring.duration.start).getTime() +
							realTodo.recurring.timeTaken
					).toISOString();
				}
			} else if (dataType === "status") {
				const currentStatus = realTodo.recurring.completionStatus[todo.index];
				currentStatus.status = value;

				// Updates the start/end dates for this recurring task
				if (newValue === "incomplete") {
					currentStatus.actualStart = "";
					currentStatus.actualEnd = "";
				} else if (newValue === "in-progress") {
					currentStatus.actualStart = new Date().toISOString();
				} else if (newValue === "complete") {
					currentStatus.actualEnd = new Date().toISOString();
				}
			} else if (["frequencyAmount", "frequencyUnit", "duration", "timeTaken", "completionStatus"].includes(dataType)) {
				if (realTodo.recurring[dataType] === value) return;
				realTodo.recurring[dataType] = value;
			} else {
				if (realTodo[dataType] === value) return;
				realTodo[dataType] = value;
				saveTodo(realTodo).then(() => { fetchTodoList(); })
				if (!forceUpdate) {
					startNotice("success", "Data Updated");
				}
				setChange(!change);
				return;
			}
		} else {
			todo[dataType] = value;
		}
		if (create) return startNotice("success", "Updated");
		todo.lastUpdated = new Date().toISOString();

		saveTodo(todo).then(() => { fetchTodoList(); })
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
			deleteTodoById(todo._id).then(() => {
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

	function saveButton() {
		if (
			!todo.title ||
			!todo.priority ||
			(!todo.recurring.isRecurring && !(todo.proposedStartDate && todo.proposedEndDate))
		) {
			return startNotice("error", "All fields are required");
		}
		saveNewTodo(todo).then(() => {
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

	function toggleRecurring() {
		if (recurringOpen) {
			const recurringOverlay: Element = document.getElementById("recurring-overlay");
			recurringOverlay.classList.add("close");
			sleep(190).then(() => {
				setRecurringOpen(false);
			});
			// Using an event listener is better and more maintainable but makes the modal reappear for a split second.
		} else {
			setRecurringOpen(true);
		}
	}

	document.querySelector("body").classList.add("freeze");
	return (
		<div id="modal-overlay" onClick={overlayClicked}>
			<div id="modal" className={create ? "create" : null}>
				<Recurring
					todo={todo}
					isOpen={recurringOpen}
					toggleRecurring={toggleRecurring}
					dataChange={dataChange}
					startNotice={startNotice}
					askConfirmation={askConfirmation}
				/>
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
				<h3 onClick={toggleRecurring} id="recurring-settings">
					Recurring Settings
				</h3>
				<div id="subtasks-wrapper">
					<h3>Subtasks:</h3>
					<img
						onClick={() => {
							setAddingSubtask(true);
						}}
						src={process.env.PUBLIC_URL + "/assets/create_plus.svg"}
						alt="Create subtask"
						id="add-subtask"
					/>
					<ul id="subtasks">
						{todo.subTasks.map((subtask, index) => (
							<SubTask
								key={index}
								subtask={subtask}
								index={index}
								setModalTodo={setModalTodo}
								dataChange={dataChange}
								startNotice={startNotice}
								askConfirmation={askConfirmation}
							/>
						))}
						{addingSubtask ? (
							<SubTask
								subtask={{ name: "", link: false, id: "" }}
								index={todo.subTasks.length}
								setModalTodo={setModalTodo}
								dataChange={dataChange}
								startNotice={startNotice}
								askConfirmation={askConfirmation}
								setAddingSubtask={setAddingSubtask}
								newSubtask={true}
							/>
						) : null}
					</ul>
				</div>
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
							saveButton();
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
