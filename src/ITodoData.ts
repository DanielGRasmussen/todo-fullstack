export default interface ITodoData {
	id?: string;
	created: string;
	proposedStartDate: string;
	actualStartDate: string;
	proposedEndDate: string;
	actualEndDate: string;
	title: string;
	description: string;
	type: string;
	subTasks: { name: string; link: boolean; id: string }[];
	parentTask: string;
	recurring: {
		isRecurring: boolean;
		// 1h = every hour, 1d = every day, 1w = every week, 1m = every month
		frequency?: string;
		// Stored in .toISOString format
		duration?: { start: string; end: string };
		// Time between planned start/end in milliseconds
		timeTaken?: number;
		completionStatus?: {
			status: string;
			actualStart: string;
			actualEnd: string;
		}[];
	};
	priority: string;
	status: string;
	lastUpdated: string;
}
