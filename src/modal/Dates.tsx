import "./css/Dates.css";
import { formatDate } from "../utils";
import React from "react";
import { ITodoData } from "../main/TodoList";

interface IDatesProps {
	todo: ITodoData;
	dataChange;
	create: boolean;
}

function Dates({ todo, dataChange, create }: IDatesProps) {
	/* This component renders an unordered list containing several list items for each date related to the "todo" item.
	 * The list items include the created date, last updated date, planned start and end dates, and actual start and end
	 * dates. The planned start and end dates are rendered as input fields that trigger the "dataChange" function when
	 * their values change. The actual start and end dates are based on pressing the button in the modal.
	 *
	 * todo: Object following ITodoData. Used for the dates.
	 * dataChange: A function to be called when a date input field is blurred with the current info in the field.
	 */
	return (
		<ul id="dates">
			<li>
				Created: <br />
				{create ? null : formatDate(todo.created)}
			</li>
			<li>
				Last Updated: <br />
				{create ? null : formatDate(todo.lastUpdated)}
			</li>
			<li>
				Planned Start: <br />
				<input
					type="text"
					defaultValue={
						create ? null : formatDate(todo.proposedStartDate)
					}
					onBlur={(event) => {
						dataChange(event.target.value, "proposedStartDate");
					}}
				/>
			</li>
			<li>
				Actual Start: <br />
				{todo.actualStartDate
					? formatDate(todo.actualStartDate)
					: "TBD"}
			</li>
			<li>
				Planned End: <br />
				<input
					type="text"
					defaultValue={
						create ? null : formatDate(todo.proposedEndDate)
					}
					onBlur={(event) => {
						dataChange(event.target.value, "proposedEndDate");
					}}
				/>
			</li>
			<li>
				Actual End: <br />
				{todo.actualEndDate ? formatDate(todo.actualEndDate) : "TBD"}
			</li>
		</ul>
	);
}

export default Dates;
