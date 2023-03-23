import { ITodoData } from "./main/TodoList";

export function formatDate(ISOstring: string): string {
	// Convert ISO to date
	return new Date(ISOstring).toLocaleString("en-US", {
		month: "numeric",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true
	});
}

export function clickAnywhere(
	elements: Element[],
	next,
	querySelectors: string[] = []
): void {
	window.addEventListener("click", (event) => {
		for (let i = 0; i < querySelectors.length; i++) {
			const selectedItem = document.querySelector(querySelectors[i]);
			elements.push(selectedItem);
		}

		if (
			!elements.some(
				(element) => element && element.contains(event.target as Node)
			)
		) {
			next();
		}
	});
}

export function sleep(ms): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function checkPriorityValid(priority: string): boolean {
	const num = parseInt(priority);
	return !isNaN(num) && num >= 0 && num <= 9 && priority.length === 1;
}

export function isDateFormatValid(dateString: string): boolean {
	const dateRegex =
		/^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4},\s([1-9]|1[0-2]):([0-5][0-9])\s(AM|PM)$/;
	/* Forgot how annoying regex is, thank you ChatGPT:
	 * (0?[1-9]|1[012]) matches the month, allowing for a leading zero if the month is between 1 and 9.
	 * (0?[1-9]|[12][0-9]|3[01]) matches the day of the month, allowing for a leading zero if the day is between 1 and 9, and restricting the day to be between 1 and 31.
	 * \d{4} matches the year as a four-digit number.
	 * , matches the comma separating the date and time.
	 * \s matches any whitespace character (including spaces, tabs, and line breaks).
	 * ([1-9]|1[0-2]) matches the hour in 12-hour format, allowing for a leading zero if the hour is between 1 and 9, and restricting the hour to be between 1 and 12.
	 * ([0-5][0-9]) matches the minute, restricting it to be between 00 and 59.
	 * \s matches any whitespace character.
	 * (AM|PM) matches the meridiem (either "AM" or "PM").
	 */

	return dateRegex.test(dateString);
}

export function getCurrentTimeInUserTimezone(): string {
	const now = new Date();
	const options: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: false,
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
	};
	return now.toLocaleTimeString(undefined, options);
}

export function filterTodosByDate(
	todo: ITodoData,
	currentTimeframe: string
): boolean {
	const currentDate = new Date();
	const datesToCheck = [
		new Date(todo.proposedStartDate),
		new Date(todo.actualStartDate),
		new Date(todo.proposedEndDate),
		new Date(todo.actualEndDate)
	];

	const now = new Date();

	switch (currentTimeframe) {
		case "behind":
			return datesToCheck.some((date) => date && date < currentDate);
		case "today":
			const today = now;
			today.setDate(now.getDate() + 1);
			today.setHours(0, 0, 0, 0);
			return datesToCheck.some((date) => date && date <= today);
		case "tomorrow":
			const tomorrow = now;
			tomorrow.setDate(now.getDate() + 2);
			tomorrow.setHours(0, 0, 0, 0);
			return datesToCheck.some((date) => date && date <= tomorrow);
		case "week":
			const endOfWeek = now;
			endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
			endOfWeek.setHours(0, 0, 0, 0);
			return datesToCheck.some((date) => date && date <= endOfWeek);
		case "month":
			const endOfMonth = new Date(
				now.getFullYear(),
				now.getMonth() + 1,
				0
			);
			endOfMonth.setHours(23, 59, 59, 999);
			return datesToCheck.some((date) => date && date <= endOfMonth);
		case "year":
			const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
			return datesToCheck.some((date) => date && date <= endOfYear);
		default:
			return true;
	}
}
