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

export function clickAnywhere(elements: Element[], next: () => void, querySelectors: string[] = []): void {
	window.addEventListener("click", (event) => {
		for (let i = 0; i < querySelectors.length; i++) {
			const selectedItem = document.querySelector(querySelectors[i]);
			elements.push(selectedItem);
		}

		if (!elements.some((element) => element && element.contains(event.target as Node))) {
			next();
		}
	});
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function checkPriorityValid(priority: string): boolean {
	const num: number = parseInt(priority);
	return !isNaN(num) && num >= 0 && num <= 9 && priority.length === 1;
}

export function filterTodosByDate(datesToCheck: string[], currentTimeframe: string): boolean {
	const now = new Date();

	switch (currentTimeframe) {
		case "behind":
			return datesToCheck.some((dateToCheck) => {
				if (!dateToCheck) return false;
				const date = new Date(dateToCheck);
				return date < now;
			});
		case "today":
			const today = now;
			today.setDate(now.getDate() + 1);
			today.setHours(0, 0, 0, 0);
			return datesToCheck.some((dateToCheck) => {
				if (!dateToCheck) return false;
				const date = new Date(dateToCheck);
				return date <= today;
			});
		case "tomorrow":
			const tomorrow = now;
			tomorrow.setDate(now.getDate() + 2);
			tomorrow.setHours(0, 0, 0, 0);
			return datesToCheck.some((dateToCheck) => {
				if (!dateToCheck) return false;
				const date = new Date(dateToCheck);
				return date <= tomorrow;
			});
		case "week":
			const endOfWeek = now;
			endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
			endOfWeek.setHours(0, 0, 0, 0);
			return datesToCheck.some((dateToCheck) => {
				if (!dateToCheck) return false;
				const date = new Date(dateToCheck);
				return date <= endOfWeek;
			});
		case "month":
			const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
			endOfMonth.setHours(23, 59, 59, 999);
			return datesToCheck.some((dateToCheck) => {
				if (!dateToCheck) return false;
				const date = new Date(dateToCheck);
				return date <= endOfMonth;
			});
		case "year":
			const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
			return datesToCheck.some((dateToCheck) => {
				if (!dateToCheck) return false;
				const date = new Date(dateToCheck);
				return date <= endOfYear;
			});
		default:
			return true;
	}
}

export function stringTimeToMS(timeString: string): number {
	// convert frequency string to milliseconds
	let MS = 0;
	switch (timeString.slice(-1)) {
		case "h":
			MS = parseInt(timeString) * 60 * 60 * 1000;
			break;
		case "d":
			MS = parseInt(timeString) * 24 * 60 * 60 * 1000;
			break;
		case "w":
			MS = parseInt(timeString) * 7 * 24 * 60 * 60 * 1000;
			break;
		case "m":
			MS = parseInt(timeString) * 30 * 24 * 60 * 60 * 1000;
			break;
		case "y":
			MS = parseInt(timeString) * 365 * 30 * 24 * 60 * 60 * 1000;
			break;
	}
	return MS;
}

export function millisecondsToMTime(ms: number): string {
	// Milliseconds to 24h time. Ex. 14:50
	const date = new Date(ms);
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
}

export function MTimeToMilliseconds(timeString: string): number {
	const [hours, minutes] = timeString.split(":").map(Number);
	const date = new Date(1970, 0, 1, hours, minutes, 0, 0);
	// offset from UTC in hours (I do not know how well it works on the other side of the world)
	const tzOffset = -date.getTimezoneOffset();
	return date.getTime() + tzOffset * 60 * 1000;
}
