import "./css/Recurring.css";
import ITodoData from "../DataInterfaces";
import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

interface IRecurringProps {
	todo: ITodoData;
	isOpen: boolean;
	toggleRecurring: () => void;
	dataChange;
	startNotice;
	askConfirmation;
}

export default function Recurring({
	todo,
	isOpen,
	toggleRecurring,
	dataChange,
	startNotice,
	askConfirmation
}: IRecurringProps): JSX.Element {
	if (!isOpen) return;
	const [checked, setChecked] = useState(todo.recurring.isRecurring);
	const [recurringDates, setRecurringDates] = useState<[Date | null, Date | null]>([
		todo.recurring.isRecurring ? new Date(todo.recurring.duration.start) : null,
		todo.recurring.isRecurring ? new Date(todo.recurring.duration.end) : null
	]);
	const [frequencyAmount, setFrequencyAmount] = useState(
		todo.recurring.isRecurring ? todo.recurring.frequencyAmount : undefined
	);
	const [frequencyUnit, setFrequencyUnit] = useState(todo.recurring.isRecurring ? todo.recurring.frequencyUnit : "");
	const [timeTaken, setTimeTaken] = useState(
		todo.recurring.isRecurring ? todo.recurring.timeTaken / 60 / 1000 : undefined
	);

	function saveRecurring() {
		const [startDate, endDate] = recurringDates;
		if (!checked) {
			if (!todo.recurring.isRecurring) return toggleRecurring();
			dataChange(false, "isRecurring", false, true); // Toggles modal in here
			return toggleRecurring();
		}
		if (!startDate || !endDate || !frequencyUnit || !frequencyAmount || !timeTaken)
			return startNotice("error", "Field is missing");
		if (frequencyAmount === 0) {
			return startNotice("error", "Frequency amount cannot be 0");
		}
		const duration = {
			start: new Date(startDate).toISOString(),
			end: new Date(endDate).toISOString()
		};
		const newTimeTaken = timeTaken * 1000 * 60;
		// For some reason dataChange is not affecting the data
		todo.recurring.frequencyAmount = frequencyAmount;
		todo.recurring.frequencyUnit = frequencyUnit;
		todo.recurring.timeTaken = newTimeTaken;
		dataChange(true, "isRecurring", false, true);
		dataChange(duration, "duration", false, true);
		dataChange(newTimeTaken.toString(), "timeTaken", false, true);
		if (todo.proposedStartDate !== "") {
			const newEnd = new Date(new Date(todo.proposedStartDate).getTime() + newTimeTaken);
			todo.proposedEndDate = newEnd.toISOString();
			dataChange("proposedEndDate", newEnd.toISOString());
		}
		return toggleRecurring();
	}

	if (!checked) {
		return (
			<div id="recurring-overlay">
				<div id="recurring">
					<section id="isRecurring">
						<label htmlFor="recurring-checkbox">Reoccurring: </label>
						<input
							type="checkbox"
							id="recurring-checkbox"
							checked={checked}
							onChange={(event) => setChecked(event.target.checked)}
						/>
					</section>
					<div id="recurring-buttons">
						<button onClick={cancelRecurring} id="recurring-cancel">
							Cancel
						</button>
						<button onClick={saveRecurring} id="recurring-save">
							Save!
						</button>
					</div>
				</div>
			</div>
		);
	}

	function cancelRecurring() {
		if (
			(!todo.recurring.isRecurring && !checked) ||
			(todo.recurring.isRecurring === checked &&
				todo.recurring.frequencyAmount === frequencyAmount &&
				todo.recurring.frequencyUnit === frequencyUnit &&
				todo.recurring.duration.start === new Date(recurringDates[0]).toISOString() &&
				todo.recurring.duration.end === new Date(recurringDates[1]).toISOString() &&
				todo.recurring.timeTaken === parseInt(timeTaken.toString()) * 1000 * 60)
		) {
			return toggleRecurring();
		}
		askConfirmation("Are you sure you want to close without saving your changes?", toggleRecurring);
	}

	function dateSelectionChange(dates): void {
		setRecurringDates(dates); // Such a function is kinda stupid but just "setRecurringDates" pops up with a TS error
	}

	return (
		<div id="recurring-overlay">
			<div id="recurring">
				{/* To separate the css for this from the other divs*/}
				<section id="isRecurring">
					<label htmlFor="recurring-checkbox">Reoccurring: </label>
					<input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
				</section>
				<div id="datepicker-wrapper">
					{/* For the clearing element. */}
					<label htmlFor="datepicker">Start/end recurring:</label>
					<DatePicker
						value={recurringDates}
						onChange={dateSelectionChange}
						selectRange
						format="MM/dd/yyyy"
						id="recurring-datepicker"
					/>
				</div>
				<div id="frequency-wrapper">
					<label htmlFor="frequencyAmount">Reoccurs once every: </label>
					<input
						type="number"
						id="frequencyAmount"
						value={frequencyAmount ? frequencyAmount : ""}
						onChange={(event) => setFrequencyAmount(parseInt(event.target.value))}
					/>
					<select value={frequencyUnit} onChange={(event) => setFrequencyUnit(event.target.value)}>
						<option value="">Select unit</option>
						<option value="d">Days</option>
						<option value="w">Weeks</option>
						<option value="m">Months</option>
						<option value="y">Years</option>
					</select>
				</div>
				<div id="time-taken-wrapper">
					<label htmlFor="time-taken">Task length (minutes):</label>
					<input
						type="number"
						id="timeTaken"
						value={timeTaken ? timeTaken : ""}
						onChange={(event) => setTimeTaken(parseInt(event.target.value))}
					/>
				</div>
				<div id="recurring-buttons">
					<button onClick={cancelRecurring} id="recurring-cancel">
						Cancel
					</button>
					<button onClick={saveRecurring} id="recurring-save">
						Save!
					</button>
				</div>
			</div>
		</div>
	);
}
