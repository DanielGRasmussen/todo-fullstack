import "./css/Modal.css";
import React from "react";

export interface ITodoData {
	id: string;
	created: string;
	proposedStartDate: string;
	actualStartDate: string;
	proposedEndDate: string;
	actualEndDate: string;
	title: string;
	description: string;
	type: string;
	subTasks: string[];
	priority: string;
	status: string;
	lastUpdated: string;
}

function Modal(isOpen: boolean, setIsOpen, todo) {
	function toggleModal() {
		setIsOpen(!isOpen);
	}

	if (isOpen) {
		return (
			<div id="modal-overlay">
				<div id="modal">
					<h2>{todo.title}</h2>
					<button onClick={toggleModal}>Close Modal</button>
				</div>
			</div>
		);
	}
}

export default Modal;
