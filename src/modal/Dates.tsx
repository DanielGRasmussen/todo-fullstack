import "./css/Dates.css";
import { formatDate } from "../utils";
import React from "react";

function Dates(todo, dataChange) {
	return (
		<ul id="dates">
			<li>Created: {formatDate(todo.created)}</li>
			<li>Last Updated: {formatDate(todo.lastUpdated)}</li>
			<li>
				Planned Start:{" "}
				<input
					type="text"
					defaultValue={formatDate(todo.proposedStartDate)}
					onBlur={(event) => {
						dataChange(event.target.value, "proposedStartDate");
					}}
				/>
			</li>
			<li>
				Actual Start:{" "}
				{todo.actualStartDate
					? formatDate(todo.actualStartDate)
					: "TBD"}
			</li>
			<li>
				Planned End:{" "}
				<input
					type="text"
					defaultValue={formatDate(todo.proposedEndDate)}
					onBlur={(event) => {
						dataChange(event.target.value, "proposedEndDate");
					}}
				/>
			</li>
			<li>
				Actual End:{" "}
				{todo.actualEndDate ? formatDate(todo.actualEndDate) : "TBD"}
			</li>
		</ul>
	);
}

export default Dates;
