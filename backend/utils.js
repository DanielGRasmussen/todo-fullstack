const mongoose = require("mongoose");

exports.getChecks = function (body, isRecurring) {
	// Returns a list of all checks with their error messages
	const { title, type, parentTask, recurring, priority, proposedStartDate, proposedEndDate } =
		body;

	// I don't like having a bunch of repeated fluff, so I decided to do an array of checks with messages.
	// I am the only one who will modify this code so ¯\\_(ツ)_/¯
	let checks = [
		{
			check: !title || title.trim() === "",
			message: "Title cannot be empty"
		},
		{
			check: !type || type.trim() === "",
			message: "Type cannot be empty"
		},
		{
			check: parentTask && !mongoose.Types.ObjectId.isValid(parentTask),
			message: "Invalid parent task id"
		},
		{
			check: recurring && !("isRecurring" in recurring),
			message: "Missing required field: isRecurring in recurring"
		},
		{
			check: priority && (isNaN(parseInt(priority)) || priority < 1 || priority > 9),
			message: "Priority must be a number from 1 to 9"
		}
	];
	if (isRecurring) {
		checks = [
			...checks,
			{
				check:
					!recurring.frequencyAmount ||
					isNaN(recurring.frequencyAmount) ||
					recurring.frequencyAmount <= 0,
				message: "Invalid frequencyAmount"
			},
			{
				check: !recurring.frequencyUnit || recurring.frequencyUnit.trim() === "",
				message: "Recurring frequencyUnit cannot be empty"
			},
			{
				check: !["d", "w", "m", "y"].includes(recurring.frequencyUnit),
				message: "Recurring frequencyUnit must be one of the following: d, w, m, y"
			},
			{
				check: !recurring.duration || !recurring.duration.start || !recurring.duration.end,
				message: "Recurring duration.start and duration.end must be specified"
			},
			{
				check:
					!recurring.duration.start ||
					isNaN(Date.parse(recurring.duration.start)) ||
					!recurring.duration.end ||
					isNaN(Date.parse(recurring.duration.end)),
				message:
					"Recurring duration.start and duration.end must follow ISO string standards"
			},
			{
				check:
					(!recurring.timeTaken && recurring.timeTaken !== 0) ||
					isNaN(parseInt(recurring.timeTaken)),
				message: "Recurring timeTaken must be a number"
			},
			{
				check: !recurring.completionStatus || !Array.isArray(recurring.completionStatus),
				message: "Recurring completionStatus must be an array"
			}
		];
	} else {
		// Only checks proposedStartDate and proposedEndDate if it is not recurring.
		checks = [
			...checks,
			{
				check: !proposedStartDate || isNaN(Date.parse(proposedStartDate)),
				message: "Proposed start date should be in a valid date format"
			},
			{
				check: !proposedEndDate || isNaN(Date.parse(proposedEndDate)),
				message: "Proposed end date should be in a valid date format"
			}
		];
	}
	return checks;
};

exports.isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/");
};

exports.isNotAuthenticated = function (req, res, next) {
	if (!req.isAuthenticated()) return next();
	res.redirect("/");
};
