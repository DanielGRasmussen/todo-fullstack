import "./css/Modal.css";
import React, { useState } from "react";
import Dates from "./Dates";
import { checkPriorityValid, sleep } from "../utils";
import SubTask from "./SubTask";
import { deleteTodoById, getTodoByIdFromLocal, saveNewTodo, saveTodo } from "../ExternalServices";
import ITodoData from "../DataInterfaces";
import Recurring from "./Recurring";

interface IModalProps {
	isOpen: boolean;
	setIsOpen;
	create;
	originalTodo;
	setModalTodo;
	fetchTodoList;
	startNotice;
	askConfirmation;
}

export function Modal({
	isOpen,
	setIsOpen,
	create,
	originalTodo,
	setModalTodo,
	fetchTodoList,
	startNotice,
	askConfirmation
}: IModalProps) {
	const [recurringOpen, setRecurringOpen] = useState(false);
	const [addingSubtask, setAddingSubtask] = useState(false);
	const [todo, setTodo] = useState(JSON.parse(JSON.stringify(originalTodo)));
	if (!isOpen) {
		delete todo._id;
		return;
	}
	if (!todo.hasOwnProperty("_id") && originalTodo.hasOwnProperty("_id")) {
		setTodo(JSON.parse(JSON.stringify(originalTodo)));
		return;
	}

	function toggleModal(saved = false) {
		function next(): void {
			document.getElementById("modal-overlay").classList.add("close");
			document.querySelector("html").classList.remove("freeze");
			sleep(190).then(() => {
				setIsOpen(false);
			});
			// Using an event listener is better and more maintainable but makes the modal reappear for a split second.
		}
		if (isOpen) {
			if (
				!saved &&
				// Checks for differences between the two.
				// Note: this does not check that all subtasks match up or recurring settings are the same.
				(originalTodo.title !== todo.title ||
				originalTodo.type !== todo.type ||
				originalTodo.priority !== todo.priority ||
				originalTodo.proposedStartDate !== todo.proposedStartDate ||
				originalTodo.proposedEndDate !== todo.proposedEndDate ||
				originalTodo.description !== todo.description ||
				originalTodo.subTasks.length !== todo.subTasks.length ||
				originalTodo.status !== todo.status)
			) askConfirmation("Are you sure you want to exit without saving?", next);
			else next();
		} else {
			setIsOpen(true);
		}
	}

	/*function dataChange(value, dataType, forceUpdate = false, recurring = false) {
		return;
		if (todo.recurring.isRecurring || recurring) {
			// Gets real todo data since the current todo would be a generated version
			let realTodo = getTodoByIdFromLocal(todo._id);
			if (create) realTodo = todo;
			if (!realTodo) return startNotice("error", "Todo not found");

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
			} else if (["frequencyAmount", "frequencyUnit", "duration", "timeTaken", "completionStatus"].includes(dataType)) {
				if (realTodo.recurring[dataType] === value) return;
				realTodo.recurring[dataType] = value;
			}
		}
		setChange(!change);
	} */

	function betterDataChange(dataType: string, value, recurring = false): void {
		// Updates current todo.
		// Also updates lastUpdated and sends a notice to user that data has been updated.
		if (recurring) todo.recurring[dataType] = value;
		else todo[dataType] = value;
		todo.lastUpdated = new Date().toISOString();
		startNotice("success", "Data Updated");
	}

	function saveTodoButton() {
		if (
			!todo.title ||
			!todo.priority ||
			!checkPriorityValid(todo.priority) ||
			(!todo.recurring.isRecurring && !(todo.proposedStartDate && todo.proposedEndDate))
		) {
			return startNotice("error", "All fields are required");
		}

		let realTodo = getTodoByIdFromLocal(todo._id);
		if (create) {
			saveNewTodo(todo).then(fetchTodoList); // Grabs from session storage
		} else if (todo.recurring.isRecurring || (realTodo && getTodoByIdFromLocal(todo._id).recurring.isRecurring)) {
			if (!realTodo) return startNotice("error", "Todo not found");
			realTodo = {
				...realTodo,
				title: todo.title,
				priority: todo.priority,
				recurring: todo.recurring,
				subTasks: todo.subTasks,
				description: todo.description
			}
			saveTodo(realTodo).then(fetchTodoList); // Grabs from session storage
		} else {
			saveTodo(todo).then(fetchTodoList); // Grabs from session storage
		}

		startNotice("success", "Saving todo");
		toggleModal(true);
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

	function overlayClicked(event) {
		if (event.target.id === "modal-overlay") toggleModal();
	}

	function changeStatus(new_status: string) {
		if (new_status === "incomplete") {
			todo.actualStartDate = "";
			todo.actualEndDate = "";
		} else todo[buttonTextOpts[new_status][2]] = new Date().toISOString();

		betterDataChange("status", new_status);
		if (todo.recurring.isRecurring) {
			// Got to update todo.recurring.completionStatus of current todo copy and the original.
			const realTodo = getTodoByIdFromLocal(todo._id);
			if (!realTodo) return startNotice("error", "Error finding original todo data.");
			const realStatus = realTodo.recurring.completionStatus[todo.index];
			const todoStatus = todo.recurring.completionStatus[todo.index];

			realStatus.status = new_status;
			todoStatus.status = new_status;

			// Updates the start/end dates for this recurring task
			if (new_status === "incomplete") {
				// If it is being set to incomplete then it was complete and needs to be reset
				realStatus.actualStart = "";
				realStatus.actualEnd = "";
				todoStatus.actualStart = "";
				todoStatus.actualEnd = "";
			} else {
				// [buttonTextOpts[new_status][2]] is the value for the current button text.
				// For example, todo[buttonTextOpts[complete][2]] = todo.actualEndDate
				realStatus[buttonTextOpts[new_status][2]] = new Date().toISOString();
				todoStatus[buttonTextOpts[new_status][2]] = new Date().toISOString();
			}
		}
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

	document.querySelector("html").classList.add("freeze");
	return (
		<div id="modal-overlay" onClick={overlayClicked}>
			<div id="modal" className={create ? "create" : null}>
				<Recurring
					todo={todo}
					isOpen={recurringOpen}
					toggleRecurring={toggleRecurring}
					dataChange={betterDataChange}
					startNotice={startNotice}
					askConfirmation={askConfirmation}
				/>
				{/* public/assets/close_x.svg */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					onClick={() => toggleModal()} // toggleModal takes a boolean parameter, don't need event.
					id="close-modal"
				>
					<line x1="4" y1="4" x2="16" y2="16" stroke="black" />
					<line x1="16" y1="4" x2="4" y2="16" stroke="black" />
				</svg>
				{/* public/assets/trash.svg */}
				<svg
					height="30"
					width="26.25"
					xmlns="http://www.w3.org/2000/svg"
					onClick={deleteTodo}
					id="delete-todo"
				>
					<path
						d="M 0 8.15625 L 0 6.175781 C 0.0390625 5.457031 0.328125 4.855469 0.871094 4.363281 C 1.414062 3.871094 2.050781 3.625 2.785156 3.625 L 5.570312 3.625 L 5.570312 2.71875 C 5.570312 1.964844 5.84375 1.324219 6.382812 0.792969 C 6.925781 0.265625 7.582031 0 8.355469 0 L 17.640625 0 C 18.414062 0 19.074219 0.265625 19.613281 0.792969 C 20.15625 1.324219 20.425781 1.964844 20.425781 2.71875 L 20.425781 3.625 L 23.210938 3.625 C 23.949219 3.625 24.585938 3.871094 25.128906 4.363281 C 25.667969 4.855469 25.960938 5.457031 26 6.175781 L 26 8.15625 C 26 8.648438 25.816406 9.074219 25.445312 9.433594 C 25.078125 9.789062 24.644531 9.96875 24.140625 9.96875 L 24.140625 25.375 C 24.140625 26.394531 23.785156 27.253906 23.066406 27.953125 C 22.351562 28.652344 21.472656 29 20.425781 29 L 5.570312 29 C 4.527344 29 3.644531 28.652344 2.929688 27.953125 C 2.214844 27.253906 1.855469 26.394531 1.855469 25.375 L 1.855469 9.96875 C 1.355469 9.96875 0.917969 9.789062 0.550781 9.433594 C 0.183594 9.074219 0 8.648438 0 8.15625 Z M 1.855469 8.15625 L 24.140625 8.15625 L 24.140625 6.34375 C 24.140625 6.082031 24.054688 5.863281 23.878906 5.695312 C 23.707031 5.523438 23.484375 5.4375 23.210938 5.4375 L 2.785156 5.4375 C 2.515625 5.4375 2.292969 5.523438 2.117188 5.695312 C 1.945312 5.863281 1.855469 6.082031 1.855469 6.34375 Z M 3.714844 25.375 C 3.714844 25.867188 3.898438 26.289062 4.265625 26.648438 C 4.632812 27.007812 5.066406 27.1875 5.570312 27.1875 L 20.425781 27.1875 C 20.929688 27.1875 21.367188 27.007812 21.734375 26.648438 C 22.101562 26.289062 22.285156 25.867188 22.285156 25.375 L 22.285156 9.96875 L 3.714844 9.96875 Z M 5.570312 24.46875 L 5.570312 12.6875 C 5.570312 12.425781 5.65625 12.207031 5.832031 12.039062 C 6.007812 11.867188 6.230469 11.78125 6.5 11.78125 L 8.355469 11.78125 C 8.628906 11.78125 8.851562 11.867188 9.023438 12.039062 C 9.199219 12.207031 9.285156 12.425781 9.285156 12.6875 L 9.285156 24.46875 C 9.285156 24.734375 9.199219 24.949219 9.023438 25.121094 C 8.851562 25.289062 8.628906 25.375 8.355469 25.375 L 6.5 25.375 C 6.230469 25.375 6.007812 25.289062 5.832031 25.121094 C 5.65625 24.949219 5.570312 24.734375 5.570312 24.46875 Z M 6.5 24.46875 L 8.355469 24.46875 L 8.355469 12.6875 L 6.5 12.6875 Z M 7.429688 3.625 L 18.570312 3.625 L 18.570312 2.71875 C 18.570312 2.457031 18.484375 2.238281 18.308594 2.070312 C 18.136719 1.898438 17.914062 1.8125 17.640625 1.8125 L 8.355469 1.8125 C 8.085938 1.8125 7.863281 1.898438 7.6875 2.070312 C 7.515625 2.238281 7.429688 2.457031 7.429688 2.71875 Z M 11.140625 24.46875 L 11.140625 12.6875 C 11.140625 12.425781 11.230469 12.207031 11.402344 12.039062 C 11.578125 11.867188 11.800781 11.78125 12.070312 11.78125 L 13.925781 11.78125 C 14.199219 11.78125 14.421875 11.867188 14.59375 12.039062 C 14.769531 12.207031 14.855469 12.425781 14.855469 12.6875 L 14.855469 24.46875 C 14.855469 24.734375 14.769531 24.949219 14.59375 25.121094 C 14.421875 25.289062 14.199219 25.375 13.925781 25.375 L 12.070312 25.375 C 11.800781 25.375 11.578125 25.289062 11.402344 25.121094 C 11.230469 24.949219 11.140625 24.734375 11.140625 24.46875 Z M 12.070312 24.46875 L 13.925781 24.46875 L 13.925781 12.6875 L 12.070312 12.6875 Z M 16.714844 24.46875 L 16.714844 12.6875 C 16.714844 12.425781 16.800781 12.207031 16.972656 12.039062 C 17.148438 11.867188 17.371094 11.78125 17.640625 11.78125 L 19.5 11.78125 C 19.769531 11.78125 19.992188 11.867188 20.167969 12.039062 C 20.339844 12.207031 20.425781 12.425781 20.425781 12.6875 L 20.425781 24.46875 C 20.425781 24.734375 20.339844 24.949219 20.167969 25.121094 C 19.992188 25.289062 19.769531 25.375 19.5 25.375 L 17.640625 25.375 C 17.371094 25.375 17.148438 25.289062 16.972656 25.121094 C 16.800781 24.949219 16.714844 24.734375 16.714844 24.46875 Z M 17.640625 24.46875 L 19.5 24.46875 L 19.5 12.6875 L 17.640625 12.6875 Z M 17.640625 24.46875 " />
				</svg>
				<input
					type="text"
					defaultValue={todo.title}
					onBlur={(event) => {
						if (event.target.value === "") return startNotice("error", "Invalid Title");
						betterDataChange("title", event.target.value);
					}}
					className="title"
				/>
				<p className="type">
					<input
						type="text"
						defaultValue={todo.type}
						onBlur={(event) => {
							if (event.target.value === "") return startNotice("error", "Invalid Type");
							betterDataChange("type", event.target.value);
						}}
					/>
				</p>
				<p className="priority">
					Priority:{" "}
					<input
						type="text"
						defaultValue={todo.priority}
						onBlur={(event) => {
							if (!checkPriorityValid(event.target.value))
								return startNotice("error", "Invalid Priority Entry");
							betterDataChange("priority", event.target.value);
						}}
					/>
				</p>
				<Dates todo={todo} dataChange={betterDataChange} create={create} />
				<h3 onClick={toggleRecurring} id="recurring-settings">
					Recurring Settings
				</h3>
				<div id="subtasks-wrapper">
					<h3>Subtasks:</h3>
					{/* public/assets/create_plus.svg */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						onClick={() => {
							setAddingSubtask(true);
						}}
						id="add-subtask"
					>
						<line x1="10" y1="2" x2="10" y2="18" stroke="black" strokeWidth="1"/>
						<line x1="2" y1="10" x2="18" y2="10" stroke="black" strokeWidth="1"/>
					</svg>
					<ul id="subtasks">
						{todo.subTasks.map((subtask, index) => (
							<SubTask
								key={index}
								subtask={subtask}
								index={index}
								modalTodo={todo}
								setModalTodo={setModalTodo}
								startNotice={startNotice}
								askConfirmation={askConfirmation}
							/>
						))}
						{addingSubtask ? (
							<SubTask
								subtask={{ name: "", link: false, id: "" }}
								index={todo.subTasks.length}
								modalTodo={todo}
								setModalTodo={setModalTodo}
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
						betterDataChange("description", event.target.value);
					}}
					id="description"
				></textarea>
				<div id="modal-buttons">
					{create
						? null
						: (
							<button
								onClick={() => {
									changeStatus(buttonTextOpts[todo.status][1]);
								}}
							>
								{buttonTextOpts[todo.status][0]}
							</button>
						)
					}
					<button onClick={saveTodoButton}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
