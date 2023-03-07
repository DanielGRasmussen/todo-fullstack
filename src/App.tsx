import "./App.css";

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
}: ITodoData) {
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

	return (
		<body>
			<header></header>
			<main>
				<h1>To-Do</h1>
				<div id="menu">
					<button id="list-button" className="selected">
						<img src={"assets/list.svg"} alt={"List icon"} />
						{/* https://iconscout.com/icon/list-format-1440385 */}
					</button>
					<button id="grid-button">
						<img src={"assets/grid.svg"} alt={"Grid icon"} />
						{/* https://iconscout.com/icon/grid-1440091 */}
					</button>
				</div>
				<div id={"todos"} className={"list"}>
					{todoElement(TodoData)}
					{todoElement(TodoData)}
					{todoElement(TodoData)}
					{todoElement(TodoData)}
					{todoElement(TodoData)}
					{todoElement(TodoData)}
				</div>
			</main>
			<footer></footer>
		</body>
	);
}

export default App;
