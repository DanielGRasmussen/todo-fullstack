import "./css/Dates.css";
import { formatDate, restoreUserInput } from "../utils";
import React from "react";

function Dates(todo, dataChange) {
	return (
		<ul id="dates">
			<li>Created: {formatDate(restoreUserInput(todo.created))}</li>
			<li>
				Last Updated: {formatDate(restoreUserInput(todo.lastUpdated))}
			</li>
			<li>
				Planned Start:{" "}
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
				Actual Start:{" "}
				{todo.actualStartDate
					? formatDate(restoreUserInput(todo.actualStartDate))
					: "TBD"}
			</li>
			<li>
				Planned End:{" "}
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
				Actual End:{" "}
				{todo.actualEndDate
					? formatDate(restoreUserInput(todo.actualEndDate))
					: "TBD"}
			</li>
		</ul>
	);
}

export default Dates;
