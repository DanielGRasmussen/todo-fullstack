import "./css/Dates.css";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { formatDate } from "../utils";
import ITodoData from "../DataInterfaces";

interface IDatesProps {
	todo: ITodoData;
	dataChange(_dataType: string, _value, _recurring?: boolean): void;
	create: boolean;
}

function Dates({ todo, dataChange, create }: IDatesProps) {
	/* This component renders an unordered list containing several list items for each date related to the "todo" item.
	 * The list items include the created date, last updated date, planned start and end dates, and actual start and end
	 * dates. The planned start and end dates are rendered as input fields that trigger the "dataChange" function when
	 * their values change. The actual start and end dates are based on pressing the button in the modal.
	 *
	 * todo: Object following DataInterfaces. Used for the dates.
	 * dataChange: A function to be called when a date input field is blurred with the current info in the field.
	 */
	const [plannedStart, setPlannedStart] = useState<Date | null>(todo.proposedStartDate
		? new Date(todo.proposedStartDate)
		: null
	);
	const [plannedEnd, setPlannedEnd] = useState<Date | null>(todo.proposedEndDate
		? new Date(todo.proposedEndDate)
		: null
	);

	const plannedStartElement: string | JSX.Element = todo.recurring.isRecurring
		? formatDate(todo.proposedStartDate)
		: (<DateTimePicker
			value={plannedStart}
			onChange={(value) => {
				setPlannedStart(value);
				dataChange("proposedStartDate", value.toISOString());
			}}
			className="modal-proposedDates"
		/>);
	const plannedEndElement: string | JSX.Element = todo.recurring.isRecurring
		? formatDate(todo.proposedEndDate)
		: (<DateTimePicker
			value={plannedEnd}
			onChange={(value) => {
				setPlannedEnd(value);
				dataChange("proposedEndDate", value.toISOString());
			}}
			className="modal-proposedDates"
			id="modal-proposedEndDate"
		/>);

	return (
		<ul id="dates">
			<li>Created: {create ? null : formatDate(todo.created)}</li>
			<li>Last Updated: {create ? null : formatDate(todo.lastUpdated)}</li>
			<li>Planned Start: {plannedStartElement}</li>
			<li>Actual Start: {todo.actualStartDate ? formatDate(todo.actualStartDate) : "TBD"}</li>
			<li>Planned End: {plannedEndElement}</li>
			<li>Actual End: {todo.actualEndDate ? formatDate(todo.actualEndDate) : "TBD"}</li>
		</ul>
	);
}

export default Dates;
