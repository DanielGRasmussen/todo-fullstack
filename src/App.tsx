import "./App.css";
import React from "react";

interface ITodoData {
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

function todoElement({
	proposedEndDate,
	title,
	description,
	type,
	priority,
	status
}: ITodoData) {
	return (
		<li className={`todo-item ${status} ${type}`}>
			<h3>{title}</h3>
			<p className="priority">Priority: {priority}</p>
			<p className="completion-date">
				Completion date:{" "}
				{new Date(proposedEndDate).toLocaleString("en-US", {
					month: "numeric",
					day: "numeric",
					year: "numeric",
					hour: "numeric",
					minute: "numeric",
					hour12: true
				})}
			</p>
			<p className="description">{description}</p>
		</li>
	);
}

function setTodoStyle(todoStyle: string): void {
	// Either "grid" or "list" should probably use an enum or boolean "isList" parameter.
	const todos = document.querySelector("#todos");
	if (!todos) {
		return;
	}
	// Gets the list style that this isn't.
	const other = todoStyle === "grid" ? "list" : "grid";
	todos.classList.remove(other);
	todos.classList.add(todoStyle);

	const selected = document.getElementById(`${todoStyle}-button`);
	const deselected = document.getElementById(`${other}-button`);
	selected.classList.add("selected");
	deselected.classList.remove("selected");
}

function App() {
	const TodoData: ITodoData = {
		created: new Date("01 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: new Date("03 March 2023 19:00 UTC").toISOString(),
		actualStartDate: new Date("03 March 2023 19:05 UTC").toISOString(),
		proposedEndDate: new Date("03 March 2023 19:30 UTC").toISOString(),
		actualEndDate: new Date("03 March 2023 19:25 UTC").toISOString(),
		title: "Eat",
		description: "Eat a sandwich",
		type: "General",
		subTasks: ["Make the sandwich", "Eat the sandwich"],
		priority: "4",
		status: "complete",
		lastUpdated: new Date("03 March 2023 19:25 UTC").toISOString()
	};

	document.title = "Main | To Do List";

	return (
		<body>
			<header></header>
			<main>
				<h1>To-Do</h1>
				<div id="menu">
					<button
						id="grid-button"
						className="selected"
						onClick={() => setTodoStyle("grid")}
					>
						<img
							src={process.env.PUBLIC_URL + "/assets/grid.svg"}
							alt="Grid icon"
						/>
						{/* https://iconscout.com/icon/grid-1440091 */}
					</button>
					<button
						id="list-button"
						onClick={() => setTodoStyle("list")}
					>
						<img
							src={process.env.PUBLIC_URL + "/assets/list.svg"}
							alt="List icon"
						/>
						{/* https://iconscout.com/icon/list-format-1440385 */}
					</button>
				</div>
				<ul id="todos" className="grid">
					{todoElement(TodoData)}
					{todoElement(TodoData)}
					{todoElement(TodoData)}
					{todoElement(TodoData)}
					{todoElement(TodoData)}
					{todoElement(TodoData)}
				</ul>
			</main>
			<footer></footer>
		</body>
	);
}

export default App;
