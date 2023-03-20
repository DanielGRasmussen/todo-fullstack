import { ITodoData } from "./main/TodoList";
import { cleanUserInput, sleep } from "./utils";

let todos: ITodoData[] = [
	{
		id: "1",
		created: new Date("15 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("16 March 2023 19:00 UTC").toISOString()
		),
		actualStartDate: new Date("16 March 2023 19:05 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("16 March 2023 19:30 UTC").toISOString()
		),
		actualEndDate: new Date("16 March 2023 19:25 UTC").toISOString(),
		title: cleanUserInput("Eat"),
		description: cleanUserInput("Eat a sandwich"),
		type: cleanUserInput("General"),
		subTasks: [
			{
				name: cleanUserInput(""),
				link: true,
				id: "19384"
			},
			{
				name: cleanUserInput("Eat the sandwich"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("4"),
		status: "complete",
		lastUpdated: new Date("17 March 2023 19:25 UTC").toISOString()
	},
	{
		id: "19384",
		created: new Date("15 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("16 March 2023 19:00 UTC").toISOString()
		),
		actualStartDate: new Date("16 March 2023 19:05 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("16 March 2023 19:30 UTC").toISOString()
		),
		actualEndDate: new Date("16 March 2023 19:25 UTC").toISOString(),
		title: cleanUserInput("Make sandwich"),
		description: cleanUserInput("Make ham sandwich"),
		type: cleanUserInput("General"),
		subTasks: [],
		priority: cleanUserInput("4"),
		status: "complete",
		lastUpdated: new Date("17 March 2023 19:25 UTC").toISOString()
	},
	{
		id: "2",
		created: new Date("16 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("17 March 2023 20:00 UTC").toISOString()
		),
		actualStartDate: new Date("17 March 2023 20:05 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("17 March 2023 21:30 UTC").toISOString()
		),
		actualEndDate: new Date("17 March 2023 21:25 UTC").toISOString(),
		title: cleanUserInput("Sleep"),
		description: cleanUserInput("Get some rest"),
		type: cleanUserInput("General"),
		subTasks: [
			{
				name: cleanUserInput("Go to bed"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Wake up refreshed"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("5"),
		status: "complete",
		lastUpdated: new Date("17 March 2023 21:25 UTC").toISOString()
	},
	{
		id: "3",
		created: new Date("17 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("18 March 2023 10:00 UTC").toISOString()
		),
		actualStartDate: "",
		proposedEndDate: cleanUserInput(
			new Date("19 March 2023 11:30 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Workout"),
		description: cleanUserInput("Go for a run"),
		type: cleanUserInput("Health"),
		subTasks: [
			{
				name: cleanUserInput("Put on running shoes"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Run for 30 minutes"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Stretch"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("3"),
		status: "incomplete",
		lastUpdated: new Date("04 March 2023 11:25 UTC").toISOString()
	},
	{
		id: "4",
		created: new Date("16 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("16 March 2023 12:00 UTC").toISOString()
		),
		actualStartDate: "",
		proposedEndDate: cleanUserInput(
			new Date("16 March 2023 13:30 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Study"),
		description: cleanUserInput("Read a chapter from a book"),
		type: cleanUserInput("Learning"),
		subTasks: [
			{
				name: cleanUserInput("Choose a book"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Read for 30 minutes"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Take notes"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("2"),
		status: "incomplete",
		lastUpdated: new Date("04 March 2023 13:25 UTC").toISOString()
	},
	{
		id: "5",
		created: new Date("05 March 2023 09:15 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("16 March 2023 08:00 UTC").toISOString()
		),
		actualStartDate: new Date("16 March 2023 08:10 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("16 March 2023 10:00 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Go for a run"),
		description: cleanUserInput("Run 5 miles at the park"),
		type: cleanUserInput("Exercise"),
		subTasks: [
			{
				name: cleanUserInput("Stretch"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Warm up"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Cool down"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("3"),
		status: "in-progress",
		lastUpdated: new Date("06 March 2023 09:45 UTC").toISOString()
	},
	{
		id: "6",
		created: new Date("07 March 2023 14:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("16 March 2023 10:00 UTC").toISOString()
		),
		actualStartDate: new Date("16 March 2023 7:30 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("18 March 2023 11:30 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Finish project report"),
		description: cleanUserInput(
			"Complete the final draft of the project report"
		),
		type: cleanUserInput("Work"),
		subTasks: [
			{
				name: cleanUserInput("Write introduction"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Add charts and graphs"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Proofread"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("2"),
		status: "in-progress",
		lastUpdated: new Date("08 March 2023 11:30 UTC").toISOString()
	},
	{
		id: "7",
		created: new Date("10 March 2023 16:45 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("11 March 2023 14:00 UTC").toISOString()
		),
		actualStartDate: "",
		proposedEndDate: cleanUserInput(
			new Date("11 March 2023 16:00 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Call mom"),
		description: cleanUserInput("Catch up with mom on the phone"),
		type: cleanUserInput("Personal"),
		subTasks: [
			{
				name: cleanUserInput("Make the call"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Ask about her day"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Tell her about yours"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("4"),
		status: "incomplete",
		lastUpdated: new Date("11 March 2023 16:00 UTC").toISOString()
	},
	{
		id: "8",
		created: new Date("12 March 2023 08:00 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("12 March 2023 10:00 UTC").toISOString()
		),
		actualStartDate: new Date("12 March 2023 10:00 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("12 March 2023 11:30 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Grocery shopping"),
		description: cleanUserInput("Buy groceries for the week"),
		type: cleanUserInput("Chores"),
		subTasks: [
			{
				name: cleanUserInput("Make a list"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Go to the store"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Check off items"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("5"),
		status: "in-progress",
		lastUpdated: new Date("12 March 2023 11:30 UTC").toISOString()
	},
	{
		id: "9",
		created: new Date("15 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("16 March 2023 19:00 UTC").toISOString()
		),
		actualStartDate: new Date("16 March 2023 19:05 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("16 March 2023 19:30 UTC").toISOString()
		),
		actualEndDate: new Date("16 March 2023 19:25 UTC").toISOString(),
		title: cleanUserInput("Eat"),
		description: cleanUserInput("Eat a sandwich"),
		type: cleanUserInput("General"),
		subTasks: [
			{
				name: cleanUserInput(""),
				link: true,
				id: "193841"
			},
			{
				name: cleanUserInput("Eat the sandwich"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("4"),
		status: "complete",
		lastUpdated: new Date("17 March 2023 19:25 UTC").toISOString()
	},
	{
		id: "193841",
		created: new Date("15 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("16 March 2023 19:00 UTC").toISOString()
		),
		actualStartDate: new Date("16 March 2023 19:05 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("16 March 2023 19:30 UTC").toISOString()
		),
		actualEndDate: new Date("16 March 2023 19:25 UTC").toISOString(),
		title: cleanUserInput("Make sandwich"),
		description: cleanUserInput("Make ham sandwich"),
		type: cleanUserInput("General"),
		subTasks: [],
		priority: cleanUserInput("4"),
		status: "complete",
		lastUpdated: new Date("17 March 2023 19:25 UTC").toISOString()
	},
	{
		id: "10",
		created: new Date("16 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("17 March 2023 20:00 UTC").toISOString()
		),
		actualStartDate: new Date("17 March 2023 20:05 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("17 March 2023 21:30 UTC").toISOString()
		),
		actualEndDate: new Date("17 March 2023 21:25 UTC").toISOString(),
		title: cleanUserInput("Sleep"),
		description: cleanUserInput("Get some rest"),
		type: cleanUserInput("General"),
		subTasks: [
			{
				name: cleanUserInput("Go to bed"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Wake up refreshed"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("5"),
		status: "complete",
		lastUpdated: new Date("17 March 2023 21:25 UTC").toISOString()
	},
	{
		id: "11",
		created: new Date("17 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("18 March 2023 10:00 UTC").toISOString()
		),
		actualStartDate: "",
		proposedEndDate: cleanUserInput(
			new Date("19 March 2023 11:30 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Workout"),
		description: cleanUserInput("Go for a run"),
		type: cleanUserInput("Health"),
		subTasks: [
			{
				name: cleanUserInput("Put on running shoes"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Run for 30 minutes"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Stretch"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("3"),
		status: "incomplete",
		lastUpdated: new Date("04 March 2023 11:25 UTC").toISOString()
	},
	{
		id: "12",
		created: new Date("16 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("16 March 2023 12:00 UTC").toISOString()
		),
		actualStartDate: "",
		proposedEndDate: cleanUserInput(
			new Date("16 March 2023 13:30 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Study"),
		description: cleanUserInput("Read a chapter from a book"),
		type: cleanUserInput("Learning"),
		subTasks: [
			{
				name: cleanUserInput("Choose a book"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Read for 30 minutes"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Take notes"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("2"),
		status: "incomplete",
		lastUpdated: new Date("04 March 2023 13:25 UTC").toISOString()
	},
	{
		id: "13",
		created: new Date("05 March 2023 09:15 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("16 March 2023 08:00 UTC").toISOString()
		),
		actualStartDate: new Date("16 March 2023 08:10 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("16 March 2023 10:00 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Go for a run"),
		description: cleanUserInput("Run 5 miles at the park"),
		type: cleanUserInput("Exercise"),
		subTasks: [
			{
				name: cleanUserInput("Stretch"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Warm up"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Cool down"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("3"),
		status: "in-progress",
		lastUpdated: new Date("06 March 2023 09:45 UTC").toISOString()
	},
	{
		id: "14",
		created: new Date("07 March 2023 14:30 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("16 March 2023 10:00 UTC").toISOString()
		),
		actualStartDate: new Date("16 March 2023 7:30 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("18 March 2023 11:30 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Finish project report"),
		description: cleanUserInput(
			"Complete the final draft of the project report"
		),
		type: cleanUserInput("Work"),
		subTasks: [
			{
				name: cleanUserInput("Write introduction"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Add charts and graphs"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Proofread"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("2"),
		status: "in-progress",
		lastUpdated: new Date("08 March 2023 11:30 UTC").toISOString()
	},
	{
		id: "15",
		created: new Date("10 March 2023 16:45 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("11 March 2023 14:00 UTC").toISOString()
		),
		actualStartDate: "",
		proposedEndDate: cleanUserInput(
			new Date("11 March 2023 16:00 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Call mom"),
		description: cleanUserInput("Catch up with mom on the phone"),
		type: cleanUserInput("Personal"),
		subTasks: [
			{
				name: cleanUserInput("Make the call"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Ask about her day"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Tell her about yours"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("4"),
		status: "incomplete",
		lastUpdated: new Date("11 March 2023 16:00 UTC").toISOString()
	},
	{
		id: "16",
		created: new Date("12 March 2023 08:00 UTC").toISOString(),
		proposedStartDate: cleanUserInput(
			new Date("12 March 2023 10:00 UTC").toISOString()
		),
		actualStartDate: new Date("12 March 2023 10:00 UTC").toISOString(),
		proposedEndDate: cleanUserInput(
			new Date("12 March 2023 11:30 UTC").toISOString()
		),
		actualEndDate: "",
		title: cleanUserInput("Grocery shopping"),
		description: cleanUserInput("Buy groceries for the week"),
		type: cleanUserInput("Chores"),
		subTasks: [
			{
				name: cleanUserInput("Make a list"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Go to the store"),
				link: false,
				id: ""
			},
			{
				name: cleanUserInput("Check off items"),
				link: false,
				id: ""
			}
		],
		priority: cleanUserInput("5"),
		status: "in-progress",
		lastUpdated: new Date("12 March 2023 11:30 UTC").toISOString()
	}
];

export async function getToDoList(): Promise<ITodoData[]> {
	await sleep(500);
	return todos;
}

export async function getTodoById(id: string): Promise<ITodoData> {
	await sleep(500);
	for (const todoData of todos) {
		if (todoData.id === id) return todoData;
	}
}

export function getTodoByIdFromLocal(id: string): ITodoData {
	for (const todoData of todos) {
		if (todoData.id === id) return todoData;
	}
}

export async function deleteTodoById(id: string): Promise<void> {
	await sleep(100);
	todos = todos.filter((item) => item.id !== id);
	return;
}
