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
	const [startDate, setStartDate] = useState(
		todo.recurring.isRecurring
			? new Date(todo.recurring.duration.start)
			: ""
	);
	const [endDate, setEndDate] = useState(
		todo.recurring.isRecurring ? new Date(todo.recurring.duration.end) : ""
	);
	const [frequencyAmount, setFrequencyAmount] = useState(
		todo.recurring.isRecurring ? todo.recurring.frequencyAmount : ""
	);
	const [frequencyUnit, setFrequencyUnit] = useState(
		todo.recurring.isRecurring ? todo.recurring.frequencyUnit : ""
	);
	const [timeTaken, setTimeTaken] = useState(
		todo.recurring.isRecurring ? todo.recurring.timeTaken / 60 / 1000 : ""
	);

	function saveRecurring() {
		if (!checked) {
			dataChange(false, "isRecurring", false, true); // Toggles modal in here
			return toggleRecurring();
		}
		if (
			!startDate ||
			!endDate ||
			!frequencyUnit ||
			!frequencyAmount ||
			!timeTaken
		)
			return startNotice("error", "Field is missing");
		if (frequencyAmount === "0") {
			return startNotice("error", "Frequency amount cannot be 0");
		}
		const duration = {
			start: new Date(startDate).toISOString(),
			end: new Date(endDate).toISOString()
		};
		dataChange(true, "isRecurring", false, true);
		dataChange(duration, "duration", false, true);
		dataChange(frequencyAmount, "frequencyAmount", false, true);
		dataChange(frequencyUnit, "frequencyUnit", false, true);
		const newTimeTaken = parseInt(timeTaken.toString()) * 1000 * 60;
		dataChange(newTimeTaken.toString(), "timeTaken", false, true);
		const newEnd = new Date(
			new Date(todo.proposedStartDate).getTime() + newTimeTaken
		);
		todo.proposedEndDate = newEnd.toISOString();
		dataChange("proposedEndDate", newEnd.toISOString());
		return toggleRecurring();
	}

	if (!checked) {
		return (
			<div id="recurring-overlay">
				<div id="recurring">
					<section id="isRecurring">
						<label htmlFor="recurring-checkbox">
							Reoccurring:{" "}
						</label>
						<input
							type="checkbox"
							id="recurring-checkbox"
							checked={checked}
							onChange={(event) =>
								setChecked(event.target.checked)
							}
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
				todo.recurring.duration.start ===
					new Date(startDate).toISOString() &&
				todo.recurring.duration.end ===
					new Date(endDate).toISOString() &&
				todo.recurring.timeTaken ===
					parseInt(timeTaken.toString()) * 1000 * 60)
		) {
			return toggleRecurring();
		}
		askConfirmation(
			"Are you sure you want to close without saving your changes?",
			toggleRecurring
		);
	}

	function dateSelectionChange(dates) {
		const [start, end]: Date[] = dates;
		setStartDate(start);
		setEndDate(end);
	}

	return (
		<div id="recurring-overlay">
			<div id="recurring">
				{/* To separate the css for this from the other divs*/}
				<section id="isRecurring">
					<label htmlFor="recurring-checkbox">Reoccurring: </label>
					<input
						type="checkbox"
						checked={checked}
						onChange={(event) => setChecked(event.target.checked)}
					/>
				</section>
				<div id="datepicker-wrapper">
					{/* For the clearing element. */}
					<label htmlFor="datepicker">Start/end recurring:</label>
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
						autoComplete="off"
					/>
				</div>
				<div id="frequency-wrapper">
					<label htmlFor="frequencyAmount">
						Reoccurs once every:{" "}
					</label>
					<input
						type="number"
						id="frequencyAmount"
						value={frequencyAmount}
						onChange={(event) =>
							setFrequencyAmount(event.target.value)
						}
					/>
					<select
						value={frequencyUnit}
						onChange={(event) =>
							setFrequencyUnit(event.target.value)
						}
					>
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
						value={timeTaken}
						onChange={(event) => setTimeTaken(event.target.value)}
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
