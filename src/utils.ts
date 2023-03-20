import DOMPurify from "dompurify";

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

export function cleanUserInput(input: string): string {
	// Sanitize the input
	const sanitizedValue = DOMPurify.sanitize(input);
	return encodeURIComponent(sanitizedValue);
}

export function restoreUserInput(input: string): string {
	return decodeURIComponent(input);
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
