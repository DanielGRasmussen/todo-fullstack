import "./css/Dates.css";
import { formatDate, restoreUserInput } from "../utils";
import React from "react";

function Dates(todo, dataChange) {
	return (
		<ul id="dates">
			<li>
				Created: <br />
				{formatDate(restoreUserInput(todo.created))}
			</li>
			<li>
				Last Updated: <br />
				{formatDate(restoreUserInput(todo.lastUpdated))}
			</li>
			<li>
				Planned Start: <br />
				<input
					type="text"
					defaultValue={formatDate(
						restoreUserInput(todo.proposedStartDate)
					)}
					onBlur={(event) => {
						dataChange(event.target.value, "proposedStartDate");
					}}
				/>
			</li>
			<li>
				Actual Start: <br />
				{todo.actualStartDate
					? formatDate(restoreUserInput(todo.actualStartDate))
					: "TBD"}
			</li>
			<li>
				Planned End: <br />
				<input
					type="text"
					defaultValue={formatDate(
						restoreUserInput(todo.proposedEndDate)
					)}
					onBlur={(event) => {
						dataChange(event.target.value, "proposedEndDate");
					}}
				/>
			</li>
			<li>
				Actual End: <br />
				{todo.actualEndDate
					? formatDate(restoreUserInput(todo.actualEndDate))
					: "TBD"}
			</li>
		</ul>
	);
}

export default Dates;
