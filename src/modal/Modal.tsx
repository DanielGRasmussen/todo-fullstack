import "./css/Modal.css";
import React, { useState } from "react";
import Dates from "./Dates";

function Subtask(subtask, dataChange) {
	return (
		<li
			onClick={(event) => {
				dataChange(event, "subtask");
			}}
		>
			{subtask}
		</li>
	);
}

function Modal(isOpen: boolean, setIsOpen, todo) {
	const [change, setChange] = useState(false);

	function toggleModal() {
		setIsOpen(!isOpen);
	}

	function dataChange(newValue, dataType: string) {
		// General dataChange function to reload the modal and pass on new data to db
		todo[dataType] = newValue;
		todo.lastUpdated = new Date().toISOString();
		// Here we should place a call to external services to update db
		setChange(!change);
	}

	function changeStatus(new_status: string) {
		if (new_status === "in-progress") {
			todo.actualStartDate = new Date().toISOString();
		} else if (new_status === "complete") {
			todo.actualEndDate = new Date().toISOString();
		} else {
			todo.actualStartDate = "";
			todo.actualEndDate = "";
		}

		dataChange(new_status, "status");
	}

	// Button text depending on status
	const buttonTextOpts = {
		incomplete: ["Start!", "in-progress"],
		"in-progress": ["Finish!", "complete"],
		complete: ["Restart?", "incomplete"]
	};

	if (isOpen) {
		return (
			<div id="modal-overlay">
				<div id="modal">
					<input
						type="text"
						defaultValue={todo.title}
						onBlur={(event) => {
							dataChange(event.target.value, "title");
						}}
						className="title"
					/>
					{/* Make look like h2 */}
					<p>
						Task type:{" "}
						<input
							type="text"
							defaultValue={todo.type}
							onBlur={(event) => {
								dataChange(event.target.value, "type");
							}}
						/>
					</p>
					{/* No clue where this should go */}
					<p>
						Priority:{" "}
						<input
							type="text"
							defaultValue={todo.priority}
							onBlur={(event) => {
								dataChange(event.target.value, "priority");
							}}
						/>
					</p>
					{Dates(todo, dataChange)}
					{/* No clue where this should go and it is nowhere near done */}
					<ul>
						{todo.subTasks.map((subtask) =>
							Subtask(subtask, dataChange)
						)}
					</ul>
					<textarea
						defaultValue={todo.description}
						onBlur={(event) => {
							dataChange(event.target.value, "description");
						}}
					></textarea>
					<button
						onClick={() => {
							changeStatus(buttonTextOpts[todo.status][1]);
						}}
					>
						{buttonTextOpts[todo.status][0]}
					</button>
					<img
						src={process.env.PUBLIC_URL + "/assets/close_x.svg"}
						alt="Close modal"
						onClick={toggleModal}
						id="close-modal"
					/>
				</div>
			</div>
		);
	}
}

export default Modal;
