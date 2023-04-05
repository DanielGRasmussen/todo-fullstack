export default interface ITodoData {
	_id?: string;
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
		// 1d = every day, 1w = every week, 1m = every month
		frequencyAmount?: number;
		// 1d = every day, 1w = every week, 1m = every month
		frequencyUnit?: string;
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

export interface IUserInfo {
	email: string;
	googleId: string;
	name: string;
	picture: string;
	_id: string;
}
