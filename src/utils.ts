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
