import "./css/TodoList.css";
import React, { Dispatch, SetStateAction, useState } from "react";
import SearchMenu from "./SearchMenu";
import TodoElement from "./TodoElement";
import { filterTodosByDate, stringTimeToMS } from "../utils";
import ITodoData from "../DataInterfaces";

function useRecurring(todoList: ITodoData[]): ITodoData[] {
	const recurringTodo: ITodoData[] = [];
	if (!todoList.length) return recurringTodo;

	for (const todo of todoList) {
		if (!todo.recurring.isRecurring) recurringTodo.push(todo);
		else {
			const frequencyMs: number = stringTimeToMS(todo.recurring.frequencyAmount + todo.recurring.frequencyUnit);
			const timeTaken: number = parseInt(todo.recurring.timeTaken.toString());
			const start: Date = new Date(todo.recurring.duration.start);
			const end: Date = new Date(todo.recurring.duration.end);
			const proposedEndDate: Date = new Date(start.getTime() + timeTaken);

			let i = 0;
			while (start <= end) {
				const completionStatus: {
					status: string;
					actualStart: string;
					actualEnd: string;
				}[] = todo.recurring.completionStatus;
				if (completionStatus.length < i + 1) {
					completionStatus.push({
						status: "incomplete",
						actualStart: "",
						actualEnd: ""
					});
				}
				recurringTodo.push({
					...todo,
					proposedStartDate: start.toISOString(),
					proposedEndDate: proposedEndDate.toISOString(),
					actualStartDate: completionStatus[i].actualStart,
					actualEndDate: completionStatus[i].actualEnd,
					status: completionStatus[i].status,
					index: i
				});
				start.setTime(start.getTime() + frequencyMs);
				proposedEndDate.setTime(start.getTime() + timeTaken);
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
	createTodo(): void;
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
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedSortingOption, setSelectedSortingOption]: [
		{ value: string; label: string }[],
		Dispatch<SetStateAction<{ value: string; label: string }[]>>
	] = useState<{ value: string; label: string }[]>([sortingOptions[0]]);
	const [sortOrder, setSortOrder] = useState<boolean>(true);
	const [filters, setFilters] = useState<{ value: string; label: string }[]>([]);
	const [currentStatusFilters, setStatusFilter] = useState<{ value: string; label: string }[]>([]);
	const [currentTimeframe, setCurrentTimeframe] = useState<{
		value: string;
		label: string;
	}>({ value: "today", label: "Today" });
	const [searchDates, setSearchDates] = useState([null, null]);

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
				index === self.findIndex((item) => item.value.toLowerCase() === todo.value.toLowerCase())
		);

	// Search query is in it, and it's type is in filters (if there are any)
	const filteredTodoList: ITodoData[] = recurringTodo.filter((todo: ITodoData) => {
		// Filter by searchQuery
		if (searchQuery && !todo.title.toLowerCase().includes(searchQuery.toLowerCase())) {
			return false;
		}

		// Filter by filters
		if (filters.length > 0 && !filters.some((filter) => filter.value === todo.type.toLowerCase())) {
			return false;
		}

		// Filter by currentStatusFilters
		if (currentStatusFilters.length === 0 && todo.status === "complete") {
			return false;
		}

		if (currentStatusFilters.length > 0 && !currentStatusFilters.some((filter) => filter.value === todo.status)) {
			return false;
		}

		// Filter by start/end date
		const datesToCheck = [todo.proposedStartDate, todo.actualStartDate, todo.proposedEndDate, todo.actualEndDate];

		const remove = datesToCheck.some((dateToCheck) => {
			if (!dateToCheck) return false;
			const date = new Date(dateToCheck);
			const [startDate, endDate] = searchDates;
			if (startDate && endDate) {
				const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
				const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1);
				return start < date && date < end;
			} else if (startDate) {
				const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
				return start < date;
			} else if (endDate) {
				const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1);
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
				searchDates={searchDates}
				setSearchDates={setSearchDates}
			/>

			<ul id="todos">
				{/* public/assets/create_plus.svg */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					onClick={createTodo}
					id="create-todo"
				>
					<line x1="10" y1="2" x2="10" y2="18" stroke="black" strokeWidth="1"/>
					<line x1="2" y1="10" x2="18" y2="10" stroke="black" strokeWidth="1"/>
				</svg>
				{sortedTodoList.map((todo, index) => (
					<TodoElement
						key={index}
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
