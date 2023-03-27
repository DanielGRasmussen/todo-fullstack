import "./css/TodoList.css";
import React, { Dispatch, SetStateAction, useState } from "react";
import SearchMenu from "./SearchMenu";
import TodoElement from "./TodoElement";
import { filterTodosByDate, stringTimeToMS } from "../utils";
import ITodoData from "../ITodoData";

function useRecurring(todoList: ITodoData[]): ITodoData[] {
	const recurringTodo = [];
	for (const todo of todoList) {
		if (!todo.recurring.isRecurring) recurringTodo.push(todo);
		else {
			const start: Date = new Date(todo.recurring.duration.start);
			const end: Date = new Date(todo.recurring.duration.end);
			const frequencyMs: number = stringTimeToMS(
				todo.recurring.frequency
			);
			const timeTaken: number = todo.recurring.timeTaken;

			let i = 0;
			while (start <= end) {
				recurringTodo.push({
					...todo,
					proposedStartDate: start.toISOString(),
					proposedEndDate: new Date(
						start.getTime() + timeTaken
					).toISOString(),
					actualStartDate:
						todo.recurring.completionStatus[i].actualStart,
					actualEndDate: todo.recurring.completionStatus[i].actualEnd,
					status: todo.recurring.completionStatus[i].status,
					index: i
				});
				start.setTime(start.getTime() + frequencyMs);
				i++;
			}
		}
	}
	return recurringTodo;
}

interface ITodoListProps {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setModalTodo: Dispatch<SetStateAction<ITodoData>>;
	todoList: ITodoData[];
	createTodo: () => void;
	setModalCreate: Dispatch<SetStateAction<boolean>>;
}

export function TodoList({
	setIsOpen,
	setModalTodo,
	todoList,
	createTodo,
	setModalCreate
}: ITodoListProps): JSX.Element {
	// Gives the todo list with sorting options
	const sortingOptions: { value: string; label: string }[] = [
		{ value: "title", label: "Title" },
		{ value: "priority", label: "Priority" },
		{ value: "status", label: "Status" },
		{ value: "type", label: "Type" },
		{ value: "created", label: "Creation date" },
		{ value: "proposedStartDate", label: "Planned start date" },
		{ value: "actualStartDate", label: "Start date" },
		{ value: "proposedEndDate", label: "Planned end date" },
		{ value: "actualEndDate", label: "End date" },
		{ value: "lastUpdated", label: "Last updated" }
	];

	// Create the elements for the search and functions to update them
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedSortingOption, setSelectedSortingOption]: [
		{ value: string; label: string }[],
		Dispatch<SetStateAction<{ value: string; label: string }[]>>
	] = useState([sortingOptions[0]]);
	const [sortOrder, setSortOrder] = useState(true);
	const [filters, setFilters] = useState([]);
	const [currentStatusFilters, setStatusFilter] = useState([]);
	const [currentTimeframe, setCurrentTimeframe] = useState<{
		value: string;
		label: string;
	}>({ value: "all", label: "All" });
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const recurringTodo: ITodoData[] = useRecurring(todoList);

	// Gets the unique types from todoList
	const filterOptions: { value: string; label: string }[] = recurringTodo
		.map((todo: ITodoData) => ({
			value: todo.type.toLowerCase(),
			label: todo.type.toLowerCase()
		}))
		.filter(
			(todo, index: number, self) =>
				// Checks if current index is the same as the first occurrence of this item.
				index ===
				self.findIndex(
					(item) =>
						item.value.toLowerCase() === todo.value.toLowerCase()
				)
		);

	// Search query is in it, and it's type is in filters (if there are any)
	const filteredTodoList = recurringTodo.filter((todo: ITodoData) => {
		// Filter by searchQuery
		if (
			searchQuery &&
			!todo.title.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false;
		}

		// Filter by filters
		if (
			filters.length > 0 &&
			!filters.some((filter) => filter.value === todo.type.toLowerCase())
		) {
			return false;
		}

		// Filter by currentStatusFilters
		if (currentStatusFilters.length === 0 && todo.status === "complete") {
			return false;
		}

		if (
			currentStatusFilters.length > 0 &&
			!currentStatusFilters.some((filter) => filter.value === todo.status)
		) {
			return false;
		}

		// Filter by start/end date
		const datesToCheck = [
			todo.proposedStartDate,
			todo.actualStartDate,
			todo.proposedEndDate,
			todo.actualEndDate
		];

		const remove = datesToCheck.some((dateToCheck) => {
			if (!dateToCheck) return false;
			const date = new Date(dateToCheck);
			if (startDate && endDate) {
				const start = new Date(
					startDate.getFullYear(),
					startDate.getMonth(),
					startDate.getDate() + 1
				);
				const end = new Date(
					endDate.getFullYear(),
					endDate.getMonth(),
					endDate.getDate() + 1
				);
				return start < date && date < end;
			} else if (startDate) {
				const start = new Date(
					startDate.getFullYear(),
					startDate.getMonth(),
					startDate.getDate() + 1
				);
				return start < date;
			} else if (endDate) {
				const end = new Date(
					endDate.getFullYear(),
					endDate.getMonth(),
					endDate.getDate() + 1
				);
				return date < end;
			}
			return true;
		});
		if (!remove) return false;

		// Filter by currentTimeframe
		return filterTodosByDate(datesToCheck, currentTimeframe.value);
	});

	const sortedTodoList: ITodoData[] = filteredTodoList.sort((a, b) => {
		let result = 0;
		for (let i = 0; i < selectedSortingOption.length; i++) {
			const aValue: string = a[selectedSortingOption[i].value];
			const bValue: string = b[selectedSortingOption[i].value];
			if (aValue < bValue) {
				result = -1;
				break;
			}
			if (aValue > bValue) {
				result = 1;
				break;
			}
		}
		return result;
	});

	if (!sortOrder) {
		sortedTodoList.reverse();
	}

	return (
		<div>
			<SearchMenu
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				sortingOptions={sortingOptions}
				selectedSortingOption={selectedSortingOption}
				setSelectedSortingOption={setSelectedSortingOption}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
				currentStatusFilters={currentStatusFilters}
				setStatusFilter={setStatusFilter}
				filterOptions={filterOptions}
				filters={filters}
				setFilters={setFilters}
				currentTimeframe={currentTimeframe}
				setCurrentTimeframe={setCurrentTimeframe}
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
			/>

			<ul id="todos">
				<img
					onClick={createTodo}
					src={process.env.PUBLIC_URL + "/assets/create_plus.svg"}
					alt="Create todo"
					id="create-todo"
				/>
				{sortedTodoList.map((todo) => (
					<TodoElement
						todo={todo}
						setIsOpen={setIsOpen}
						setModalTodo={setModalTodo}
						setModalCreate={setModalCreate}
					/>
				))}
			</ul>
		</div>
	);
}
