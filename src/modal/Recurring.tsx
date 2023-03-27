import "./css/Recurring.css";
import ITodoData from "../ITodoData";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IRecurringProps {
	todo: ITodoData;
	isOpen: boolean;
	toggleRecurring: () => void;
	dataChange;
}

export default function Recurring({
	todo,
	isOpen,
	toggleRecurring,
	dataChange
}: IRecurringProps): JSX.Element {
	if (!isOpen) return;
	const [startDate, setStartDate] = useState(
		new Date(todo.recurring.duration.start)
	);
	const [endDate, setEndDate] = useState(
		new Date(todo.recurring.duration.end)
	);
	const [timeTaken, setTimeTaken] = useState(todo.recurring.timeTaken);

	function overlayClicked(event) {
		if (event.target.id === "recurring-overlay") toggleRecurring();
	}

	function dateSelectionChange(dates) {
		const [start, end]: Date[] = dates;
		setStartDate(start);
		setEndDate(end);
		if (start && end) {
			dataChange(
				{ start: start.toISOString(), end: end.toISOString() },
				"duration"
			);
		}
	}

	function recurringCheckbox(event) {
		dataChange(event.target.checked, "isRecurring");
	}

	return (
		<div id="recurring-overlay" onClick={overlayClicked}>
			<div id="recurring">
				<label htmlFor="recurring-checkbox">Reoccurring: </label>
				<input
					type="checkbox"
					id="recurring-checkbox"
					checked={todo.recurring.isRecurring}
					onChange={recurringCheckbox}
				/>
				{todo.recurring.isRecurring ? (
					<>
						<div id="datepicker-wrapper">
							{/* For the clearing element. */}
							<label htmlFor="datepicker">
								Start/end recurring:
							</label>
							<DatePicker
								selected={startDate}
								onChange={dateSelectionChange}
								startDate={startDate}
								endDate={endDate}
								selectsRange
								showIcon
								isClearable
								placeholderText="Select date range"
								id="datepicker"
							/>
						</div>
						<label htmlFor="frequencyAmount">
							Reoccurs once every:{" "}
						</label>
						<input
							type="number"
							id="frequencyAmount"
							value={todo.recurring.frequencyAmount}
							onChange={(event) =>
								dataChange(
									event.target.value,
									"frequencyAmount"
								)
							}
						/>
						<select
							value={todo.recurring.frequencyUnit}
							onChange={(event) =>
								dataChange(event.target.value, "frequencyUnit")
							}
						>
							<option value="d">Days</option>
							<option value="w">Weeks</option>
							<option value="m">Months</option>
							<option value="y">Years</option>
						</select>
						<label htmlFor="time-taken">Time taken:</label>
						<input
							type="number"
							id="timeTaken"
							value={
								timeTaken === 0
									? ""
									: Number(timeTaken / 60 / 1000)
							}
							onChange={(event) => {
								if (
									parseInt(event.target.value) &&
									parseInt(event.target.value) > 0
								) {
									dataChange(
										(
											parseInt(event.target.value) *
											1000 *
											60
										).toString(),
										"timeTaken"
									);
									setTimeTaken(
										parseInt(event.target.value) * 1000 * 60
									);
								} else {
									setTimeTaken(0);
								}
							}}
						/>
					</>
				) : null}
			</div>
		</div>
	);
}
