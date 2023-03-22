import "./css/TodoElement.css";
import React from "react";
import { ITodoData } from "./TodoList";
import { formatDate } from "../utils";

interface ITodoElementProps {
	todo: ITodoData;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setModalTodo: React.Dispatch<React.SetStateAction<ITodoData>>;
}

function TodoElement({
	todo,
	setIsOpen,
	setModalTodo
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

	// IDE and ESLint disagreed how it should be formatted
	const actual = `Start date: ${formatDate(todo.actualStartDate)}`;
	const planned = `Planned Start: ${formatDate(todo.proposedStartDate)}`;

	return (
		<li
			key={todo.id}
			className={`todo-item ${todo.status} ${todo.type} ${
				behindStart || behindFinish ? "behind" : ""
			}`}
			onClick={() => {
				setIsOpen(true);
				setModalTodo(todo);
			}}
		>
			<h3>{todo.title}</h3>
			<p className="type">{todo.type}</p>
			<p className="priority">Priority: {todo.priority}</p>
			<p className="date">{todo.actualStartDate ? actual : planned}</p>
			<p className="date">
				Completion date:{" "}
				{formatDate(
					todo.actualEndDate
						? todo.actualEndDate
						: todo.proposedEndDate
				)}
			</p>
			<p className="description">{todo.description}</p>
		</li>
	);
}

export default TodoElement;
