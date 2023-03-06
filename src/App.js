import "./App.css";

/* API Schema
 * Collection 1 - Users: (id, username) 2 fields
 * Collection 2 - To-Do: (userId, id, created, proposedStartDate, actualStartDate, proposedEndDate, actualEndDate, title, description, type, subTasks, priority, status, lastUpdated) 14 fields
 * Collection 3 - Shopping List (name, inventoryId, quantityNeeded) 3 fields
 * Collection 4 - Inventory: (name, id, description / tags, quantity, minimumQuantity, lastUpdated) 6 fields
 * */

function todo_item({
	// TODO remove unneeded
	created,
	proposedStartDate,
	actualStartDate,
	proposedEndDate,
	actualEndDate,
	title,
	description,
	type,
	subTasks,
	priority,
	status,
	lastUpdated
}) {
	return (
		<div className={`todo-item ${status} ${type}`}>
			<h3>{title}</h3>
			<div className={"goal-date"}>
				Goal:{" "}
				{new Date(proposedEndDate).toLocaleString("en-US", {
					month: "numeric",
					day: "numeric",
					year: "numeric",
					hour: "numeric",
					minute: "numeric",
					hour12: true
				})}
			</div>
			<p>{description}</p>
		</div>
	);
}

function App() {
	const todoItem = {
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
	return (
		<main>
			<h1>To-Do</h1>
			{todo_item(todoItem)}
			{todo_item(todoItem)}
			{todo_item(todoItem)}
			{todo_item(todoItem)}
			{todo_item(todoItem)}
			{todo_item(todoItem)}
		</main>
	);
}

export default App;
