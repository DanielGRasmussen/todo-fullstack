import { ITodoData } from "./main/TodoList";
import { sleep } from "./utils";

let todos: ITodoData[] = [
	{
		id: "1",
		created: new Date("15 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: new Date("16 March 2023 19:00 UTC").toISOString(),
		actualStartDate: new Date("16 March 2023 19:05 UTC").toISOString(),
		proposedEndDate: new Date("16 March 2023 19:30 UTC").toISOString(),
		actualEndDate: new Date("16 March 2023 19:25 UTC").toISOString(),
		title: "Eat",
		description: "Eat a sandwich",
		type: "General",
		subTasks: [
			{
				name: "",
				link: true,
				id: "19384"
			},
			{
				name: "Eat the sandwich",
				link: false,
				id: ""
			}
		],
		priority: "4",
		status: "complete",
		lastUpdated: new Date("17 March 2023 19:25 UTC").toISOString()
	},
	{
		id: "19384",
		created: new Date("15 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: new Date("16 March 2023 19:00 UTC").toISOString(),
		actualStartDate: new Date("16 March 2023 19:05 UTC").toISOString(),
		proposedEndDate: new Date("16 March 2023 19:30 UTC").toISOString(),
		actualEndDate: new Date("16 March 2023 19:25 UTC").toISOString(),
		title: "Make sandwich",
		description: "Make ham sandwich",
		type: "General",
		subTasks: [],
		priority: "4",
		status: "complete",
		lastUpdated: new Date("17 March 2023 19:25 UTC").toISOString()
	},
	{
		id: "2",
		created: new Date("16 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: new Date("17 March 2023 20:00 UTC").toISOString(),
		actualStartDate: new Date("17 March 2023 20:05 UTC").toISOString(),
		proposedEndDate: new Date("17 March 2023 21:30 UTC").toISOString(),
		actualEndDate: new Date("17 March 2023 21:25 UTC").toISOString(),
		title: "Sleep",
		description: "Get some rest",
		type: "General",
		subTasks: [
			{
				name: "Go to bed",
				link: false,
				id: ""
			},
			{
				name: "Wake up refreshed",
				link: false,
				id: ""
			}
		],
		priority: "5",
		status: "complete",
		lastUpdated: new Date("17 March 2023 21:25 UTC").toISOString()
	},
	{
		id: "3",
		created: new Date("17 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: new Date("18 March 2023 10:00 UTC").toISOString(),
		actualStartDate: "",
		proposedEndDate: new Date("19 March 2023 11:30 UTC").toISOString(),
		actualEndDate: "",
		title: "Workout",
		description: "Go for a run",
		type: "Health",
		subTasks: [
			{
				name: "Put on running shoes",
				link: false,
				id: ""
			},
			{
				name: "Run for 30 minutes",
				link: false,
				id: ""
			},
			{
				name: "Stretch",
				link: false,
				id: ""
			}
		],
		priority: "3",
		status: "incomplete",
		lastUpdated: new Date("04 March 2023 11:25 UTC").toISOString()
	},
	{
		id: "4",
		created: new Date("16 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: new Date("16 March 2023 12:00 UTC").toISOString(),
		actualStartDate: "",
		proposedEndDate: new Date("16 March 2023 13:30 UTC").toISOString(),
		actualEndDate: "",
		title: "Study",
		description: "Read a chapter from a book",
		type: "Learning",
		subTasks: [
			{
				name: "Choose a book",
				link: false,
				id: ""
			},
			{
				name: "Read for 30 minutes",
				link: false,
				id: ""
			},
			{
				name: "Take notes",
				link: false,
				id: ""
			}
		],
		priority: "2",
		status: "incomplete",
		lastUpdated: new Date("04 March 2023 13:25 UTC").toISOString()
	},
	{
		id: "5",
		created: new Date("05 March 2023 09:15 UTC").toISOString(),
		proposedStartDate: new Date("16 March 2023 08:00 UTC").toISOString(),
		actualStartDate: new Date("16 March 2023 08:10 UTC").toISOString(),
		proposedEndDate: new Date("16 March 2023 10:00 UTC").toISOString(),
		actualEndDate: "",
		title: "Go for a run",
		description: "Run 5 miles at the park",
		type: "Exercise",
		subTasks: [
			{
				name: "Stretch",
				link: false,
				id: ""
			},
			{
				name: "Warm up",
				link: false,
				id: ""
			},
			{
				name: "Cool down",
				link: false,
				id: ""
			}
		],
		priority: "3",
		status: "in-progress",
		lastUpdated: new Date("06 March 2023 09:45 UTC").toISOString()
	},
	{
		id: "6",
		created: new Date("07 March 2023 14:30 UTC").toISOString(),
		proposedStartDate: new Date("16 March 2023 10:00 UTC").toISOString(),
		actualStartDate: new Date("16 March 2023 7:30 UTC").toISOString(),
		proposedEndDate: new Date("18 March 2023 11:30 UTC").toISOString(),
		actualEndDate: "",
		title: "Finish project report",
		description: "Complete the final draft of the project report",
		type: "Work",
		subTasks: [
			{
				name: "Write introduction",
				link: false,
				id: ""
			},
			{
				name: "Add charts and graphs",
				link: false,
				id: ""
			},
			{
				name: "Proofread",
				link: false,
				id: ""
			}
		],
		priority: "2",
		status: "in-progress",
		lastUpdated: new Date("08 March 2023 11:30 UTC").toISOString()
	},
	{
		id: "7",
		created: new Date("10 March 2023 16:45 UTC").toISOString(),
		proposedStartDate: new Date("11 March 2023 14:00 UTC").toISOString(),
		actualStartDate: "",
		proposedEndDate: new Date("11 March 2023 16:00 UTC").toISOString(),
		actualEndDate: "",
		title: "Call mom",
		description: "Catch up with mom on the phone",
		type: "Personal",
		subTasks: [
			{
				name: "Make the call",
				link: false,
				id: ""
			},
			{
				name: "Ask about her day",
				link: false,
				id: ""
			},
			{
				name: "Tell her about yours",
				link: false,
				id: ""
			}
		],
		priority: "4",
		status: "incomplete",
		lastUpdated: new Date("11 March 2023 16:00 UTC").toISOString()
	},
	{
		id: "8",
		created: new Date("12 March 2023 08:00 UTC").toISOString(),
		proposedStartDate: new Date("12 March 2023 10:00 UTC").toISOString(),
		actualStartDate: new Date("12 March 2023 10:00 UTC").toISOString(),
		proposedEndDate: new Date("12 March 2023 11:30 UTC").toISOString(),
		actualEndDate: "",
		title: "Grocery shopping",
		description: "Buy groceries for the week",
		type: "Chores",
		subTasks: [
			{
				name: "Make a list",
				link: false,
				id: ""
			},
			{
				name: "Go to the store",
				link: false,
				id: ""
			},
			{
				name: "Check off items",
				link: false,
				id: ""
			}
		],
		priority: "5",
		status: "in-progress",
		lastUpdated: new Date("12 March 2023 11:30 UTC").toISOString()
	},
	{
		id: "9",
		created: new Date("15 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: new Date("16 March 2023 19:00 UTC").toISOString(),
		actualStartDate: new Date("16 March 2023 19:05 UTC").toISOString(),
		proposedEndDate: new Date("16 March 2023 19:30 UTC").toISOString(),
		actualEndDate: new Date("16 March 2023 19:25 UTC").toISOString(),
		title: "Eat",
		description: "Eat a sandwich",
		type: "General",
		subTasks: [
			{
				name: "",
				link: true,
				id: "193841"
			},
			{
				name: "Eat the sandwich",
				link: false,
				id: ""
			}
		],
		priority: "4",
		status: "complete",
		lastUpdated: new Date("17 March 2023 19:25 UTC").toISOString()
	},
	{
		id: "193841",
		created: new Date("15 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: new Date("16 March 2023 19:00 UTC").toISOString(),
		actualStartDate: new Date("16 March 2023 19:05 UTC").toISOString(),
		proposedEndDate: new Date("16 March 2023 19:30 UTC").toISOString(),
		actualEndDate: new Date("16 March 2023 19:25 UTC").toISOString(),
		title: "Make sandwich",
		description: "Make ham sandwich",
		type: "General",
		subTasks: [],
		priority: "4",
		status: "complete",
		lastUpdated: new Date("17 March 2023 19:25 UTC").toISOString()
	},
	{
		id: "10",
		created: new Date("16 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: new Date("17 March 2023 20:00 UTC").toISOString(),
		actualStartDate: new Date("17 March 2023 20:05 UTC").toISOString(),
		proposedEndDate: new Date("17 March 2023 21:30 UTC").toISOString(),
		actualEndDate: new Date("17 March 2023 21:25 UTC").toISOString(),
		title: "Sleep",
		description: "Get some rest",
		type: "General",
		subTasks: [
			{
				name: "Go to bed",
				link: false,
				id: ""
			},
			{
				name: "Wake up refreshed",
				link: false,
				id: ""
			}
		],
		priority: "5",
		status: "complete",
		lastUpdated: new Date("17 March 2023 21:25 UTC").toISOString()
	},
	{
		id: "11",
		created: new Date("17 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: new Date("18 March 2023 10:00 UTC").toISOString(),
		actualStartDate: "",
		proposedEndDate: new Date("19 March 2023 11:30 UTC").toISOString(),
		actualEndDate: "",
		title: "Workout",
		description: "Go for a run",
		type: "Health",
		subTasks: [
			{
				name: "Put on running shoes",
				link: false,
				id: ""
			},
			{
				name: "Run for 30 minutes",
				link: false,
				id: ""
			},
			{
				name: "Stretch",
				link: false,
				id: ""
			}
		],
		priority: "3",
		status: "incomplete",
		lastUpdated: new Date("04 March 2023 11:25 UTC").toISOString()
	},
	{
		id: "12",
		created: new Date("16 March 2023 19:30 UTC").toISOString(),
		proposedStartDate: new Date("16 March 2023 12:00 UTC").toISOString(),
		actualStartDate: "",
		proposedEndDate: new Date("16 March 2023 13:30 UTC").toISOString(),
		actualEndDate: "",
		title: "Study",
		description: "Read a chapter from a book",
		type: "Learning",
		subTasks: [
			{
				name: "Choose a book",
				link: false,
				id: ""
			},
			{
				name: "Read for 30 minutes",
				link: false,
				id: ""
			},
			{
				name: "Take notes",
				link: false,
				id: ""
			}
		],
		priority: "2",
		status: "incomplete",
		lastUpdated: new Date("04 March 2023 13:25 UTC").toISOString()
	},
	{
		id: "13",
		created: new Date("05 March 2023 09:15 UTC").toISOString(),
		proposedStartDate: new Date("16 March 2023 08:00 UTC").toISOString(),
		actualStartDate: new Date("16 March 2023 08:10 UTC").toISOString(),
		proposedEndDate: new Date("16 March 2023 10:00 UTC").toISOString(),
		actualEndDate: "",
		title: "Go for a run",
		description: "Run 5 miles at the park",
		type: "Exercise",
		subTasks: [
			{
				name: "Stretch",
				link: false,
				id: ""
			},
			{
				name: "Warm up",
				link: false,
				id: ""
			},
			{
				name: "Cool down",
				link: false,
				id: ""
			}
		],
		priority: "3",
		status: "in-progress",
		lastUpdated: new Date("06 March 2023 09:45 UTC").toISOString()
	},
	{
		id: "14",
		created: new Date("07 March 2023 14:30 UTC").toISOString(),
		proposedStartDate: new Date("16 March 2023 10:00 UTC").toISOString(),
		actualStartDate: new Date("16 March 2023 7:30 UTC").toISOString(),
		proposedEndDate: new Date("18 March 2023 11:30 UTC").toISOString(),
		actualEndDate: "",
		title: "Finish project report",
		description: "Complete the final draft of the project report",
		type: "Work",
		subTasks: [
			{
				name: "Write introduction",
				link: false,
				id: ""
			},
			{
				name: "Add charts and graphs",
				link: false,
				id: ""
			},
			{
				name: "Proofread",
				link: false,
				id: ""
			}
		],
		priority: "2",
		status: "in-progress",
		lastUpdated: new Date("08 March 2023 11:30 UTC").toISOString()
	},
	{
		id: "15",
		created: new Date("10 March 2023 16:45 UTC").toISOString(),
		proposedStartDate: new Date("11 March 2023 14:00 UTC").toISOString(),
		actualStartDate: "",
		proposedEndDate: new Date("11 March 2023 16:00 UTC").toISOString(),
		actualEndDate: "",
		title: "Call mom",
		description: "Catch up with mom on the phone",
		type: "Personal",
		subTasks: [
			{
				name: "Make the call",
				link: false,
				id: ""
			},
			{
				name: "Ask about her day",
				link: false,
				id: ""
			},
			{
				name: "Tell her about yours",
				link: false,
				id: ""
			}
		],
		priority: "4",
		status: "incomplete",
		lastUpdated: new Date("11 March 2023 16:00 UTC").toISOString()
	},
	{
		id: "16",
		created: new Date("12 March 2023 08:00 UTC").toISOString(),
		proposedStartDate: new Date("12 March 2023 10:00 UTC").toISOString(),
		actualStartDate: new Date("12 March 2023 10:00 UTC").toISOString(),
		proposedEndDate: new Date("12 March 2023 11:30 UTC").toISOString(),
		actualEndDate: "",
		title: "Grocery shopping",
		description: "Buy groceries for the week",
		type: "Chores",
		subTasks: [
			{
				name: "Make a list",
				link: false,
				id: ""
			},
			{
				name: "Go to the store",
				link: false,
				id: ""
			},
			{
				name: "Check off items",
				link: false,
				id: ""
			}
		],
		priority: "5",
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
