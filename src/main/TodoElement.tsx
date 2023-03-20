import "./css/TodoElement.css";
import React from "react";
import { formatDate, restoreUserInput } from "../utils";

function TodoElement(todo, setIsOpen, setModalTodo): JSX.Element {
	const behindStart: boolean =
		todo.status === "incomplete" &&
		!todo.actualStartDate &&
		new Date() > new Date(restoreUserInput(todo.proposedStartDate));
	const behindFinish: boolean =
		todo.status === "in-progress" &&
		!todo.actualEndDate &&
		new Date() > new Date(restoreUserInput(todo.proposedEndDate));

	return (
		<li
			key={todo.id}
			className={`todo-item ${todo.status} ${restoreUserInput(
				todo.type
			)} ${behindStart || behindFinish ? "behind" : ""}`}
			onClick={() => {
				setIsOpen(true);
				setModalTodo(todo);
			}}
		>
			<h3>{restoreUserInput(todo.title)}</h3>
			<p className="type">{restoreUserInput(todo.type)}</p>
			<p className="priority">
				Priority: {restoreUserInput(todo.priority)}
			</p>
			<p className="date">
				{todo.actualStartDate
					? `Start date: ${formatDate(todo.actualStartDate)}`
					: `Planned Start: ${formatDate(todo.proposedStartDate)}`}
			</p>
			<p className="date">
				Completion date:{" "}
				{formatDate(
					todo.actualEndDate
						? todo.actualEndDate
						: restoreUserInput(todo.proposedEndDate)
				)}
			</p>
			<p className="description">{restoreUserInput(todo.description)}</p>
		</li>
	);
}

export default TodoElement;
