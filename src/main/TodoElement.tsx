import "./css/TodoElement.css";
import React from "react";
import { formatDate } from "../utils";
import ITodoData from "../ITodoData";

interface ITodoElementProps {
	todo: ITodoData;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setModalTodo: React.Dispatch<React.SetStateAction<ITodoData>>;
	setModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

function TodoElement({
	todo,
	setIsOpen,
	setModalTodo,
	setModalCreate
}: ITodoElementProps): JSX.Element {
	/* This renders an element with information given to it in the parameters.
	 *
	 * This component takes three props:
	 * todo: object that follows ITodoData and have its information used for this.
	 * setIsOpen: a function that sets a boolean state indicating whether a modal is open.
	 * setModalTodo: a function that sets a state object representing the currently selected todo item in the modal.
	 *
	 * This renders a list item with the information of a single "todo" item. It uses the planned/actual dates depending
	 * on if the actual has any content. It also applies classes depending on if the plans are behind schedule.
	 */
	const behindStart: boolean =
		todo.status === "incomplete" &&
		!todo.actualStartDate &&
		new Date() > new Date(todo.proposedStartDate);
	const behindFinish: boolean =
		todo.status === "in-progress" &&
		!todo.actualEndDate &&
		new Date() > new Date(todo.proposedEndDate);

	const actualStart = `Start date: ${formatDate(todo.actualStartDate)}`;
	const plannedStart = `Planned Start: ${formatDate(todo.proposedStartDate)}`;

	const actualEnd = `Completion date: ${formatDate(todo.actualEndDate)}`;
	const plannedEnd = `Planned Completion: ${formatDate(
		todo.proposedEndDate
	)}`;

	return (
		<li
			className={`todo-item ${todo.status} ${todo.type} ${
				behindStart || behindFinish ? "behind" : ""
			}`}
			onClick={() => {
				setModalCreate(false);
				setIsOpen(true);
				setModalTodo(todo);
			}}
		>
			<h3>{todo.title}</h3>
			<p className="type">{todo.type}</p>
			<p className="priority">Priority: {todo.priority}</p>
			<p className="date">
				{todo.actualStartDate ? actualStart : plannedStart}
			</p>
			<p className="date">
				{todo.actualEndDate ? actualEnd : plannedEnd}
			</p>
			<p className="description">{todo.description}</p>
		</li>
	);
}

export default TodoElement;
