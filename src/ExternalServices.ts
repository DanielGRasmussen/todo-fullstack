import { ITodoData } from "./TodoList";

export async function getToDoList(): Promise<ITodoData[]> {
	const todos: ITodoData[] = [
		{
			created: new Date("01 March 2023 19:30 UTC").toISOString(),
			proposedStartDate: new Date(
				"03 March 2023 19:00 UTC"
			).toISOString(),
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
		},
		{
			created: new Date("01 March 2023 19:30 UTC").toISOString(),
			proposedStartDate: new Date(
				"03 March 2023 20:00 UTC"
			).toISOString(),
			actualStartDate: new Date("03 March 2023 20:05 UTC").toISOString(),
			proposedEndDate: new Date("03 March 2023 21:30 UTC").toISOString(),
			actualEndDate: new Date("03 March 2023 21:25 UTC").toISOString(),
			title: "Sleep",
			description: "Get some rest",
			type: "General",
			subTasks: ["Go to bed", "Wake up refreshed"],
			priority: "5",
			status: "complete",
			lastUpdated: new Date("03 March 2023 21:25 UTC").toISOString()
		},
		{
			created: new Date("01 March 2023 19:30 UTC").toISOString(),
			proposedStartDate: new Date(
				"04 March 2023 10:00 UTC"
			).toISOString(),
			actualStartDate: new Date("04 March 2023 10:05 UTC").toISOString(),
			proposedEndDate: new Date("04 March 2023 11:30 UTC").toISOString(),
			actualEndDate: new Date("04 March 2023 11:25 UTC").toISOString(),
			title: "Workout",
			description: "Go for a run",
			type: "Health",
			subTasks: ["Put on running shoes", "Run for 30 minutes", "Stretch"],
			priority: "3",
			status: "incomplete",
			lastUpdated: new Date("04 March 2023 11:25 UTC").toISOString()
		},
		{
			created: new Date("01 March 2023 19:30 UTC").toISOString(),
			proposedStartDate: new Date(
				"04 March 2023 12:00 UTC"
			).toISOString(),
			actualStartDate: new Date("04 March 2023 12:05 UTC").toISOString(),
			proposedEndDate: new Date("04 March 2023 13:30 UTC").toISOString(),
			actualEndDate: new Date("04 March 2023 13:25 UTC").toISOString(),
			title: "Study",
			description: "Read a chapter from a book",
			type: "Learning",
			subTasks: ["Choose a book", "Read for 30 minutes", "Take notes"],
			priority: "2",
			status: "incomplete",
			lastUpdated: new Date("04 March 2023 13:25 UTC").toISOString()
		},
		{
			created: new Date("05 March 2023 09:15 UTC").toISOString(),
			proposedStartDate: new Date(
				"06 March 2023 08:00 UTC"
			).toISOString(),
			actualStartDate: new Date("06 March 2023 08:10 UTC").toISOString(),
			proposedEndDate: new Date("06 March 2023 10:00 UTC").toISOString(),
			actualEndDate: new Date("06 March 2023 09:45 UTC").toISOString(),
			title: "Go for a run",
			description: "Run 5 miles at the park",
			type: "Exercise",
			subTasks: ["Stretch", "Warm up", "Cool down"],
			priority: "3",
			status: "in-progress",
			lastUpdated: new Date("06 March 2023 09:45 UTC").toISOString()
		},
		{
			created: new Date("07 March 2023 14:30 UTC").toISOString(),
			proposedStartDate: new Date(
				"08 March 2023 10:00 UTC"
			).toISOString(),
			actualStartDate: "",
			proposedEndDate: new Date("08 March 2023 11:30 UTC").toISOString(),
			actualEndDate: "",
			title: "Finish project report",
			description: "Complete the final draft of the project report",
			type: "Work",
			subTasks: [
				"Write introduction",
				"Add charts and graphs",
				"Proofread"
			],
			priority: "2",
			status: "pending",
			lastUpdated: new Date("08 March 2023 11:30 UTC").toISOString()
		},
		{
			created: new Date("10 March 2023 16:45 UTC").toISOString(),
			proposedStartDate: new Date(
				"11 March 2023 14:00 UTC"
			).toISOString(),
			actualStartDate: "",
			proposedEndDate: new Date("11 March 2023 16:00 UTC").toISOString(),
			actualEndDate: "",
			title: "Call mom",
			description: "Catch up with mom on the phone",
			type: "Personal",
			subTasks: [
				"Make the call",
				"Ask about her day",
				"Tell her about yours"
			],
			priority: "4",
			status: "pending",
			lastUpdated: new Date("11 March 2023 16:00 UTC").toISOString()
		},
		{
			created: new Date("12 March 2023 08:00 UTC").toISOString(),
			proposedStartDate: new Date(
				"12 March 2023 10:00 UTC"
			).toISOString(),
			actualStartDate: "",
			proposedEndDate: new Date("12 March 2023 11:30 UTC").toISOString(),
			actualEndDate: "",
			title: "Grocery shopping",
			description: "Buy groceries for the week",
			type: "Chores",
			subTasks: ["Make a list", "Go to the store", "Check off items"],
			priority: "5",
			status: "pending",
			lastUpdated: new Date("12 March 2023 11:30 UTC").toISOString()
		}
	];

	return todos;
}
