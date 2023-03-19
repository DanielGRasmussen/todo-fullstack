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

export function clickAnywhere(elements: Element[], next): void {
	window.addEventListener("click", (event) => {
		if (
			elements.some(
				(element) => element && !element.contains(event.target as Node)
			)
		) {
			next();
		}
	});
}

export function sleep(ms): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
