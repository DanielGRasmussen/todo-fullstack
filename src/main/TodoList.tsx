import "./css/TodoList.css";
import React, { Dispatch, SetStateAction, useState } from "react";
import SearchMenu from "./SearchMenu";
import TodoElement from "./TodoElement";

export interface ITodoData {
	id: string;
	created: string;
	proposedStartDate: string;
	actualStartDate: string;
	proposedEndDate: string;
	actualEndDate: string;
	title: string;
	description: string;
	type: string;
	subTasks: { name: string; link: boolean; id: string }[];
	priority: string;
	status: string;
	lastUpdated: string;
}

interface ITodoListProps {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setModalTodo: Dispatch<SetStateAction<ITodoData>>;
	todoList: ITodoData[];
}

export function TodoList({
	setIsOpen,
	setModalTodo,
	todoList
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

	// Gets the unique types from todoList
	const filterOptions: { value: string; label: string }[] = todoList
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
	const filteredTodoList = todoList.filter((todo: ITodoData) => {
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

		// If all conditions are met, return true to keep this todoitem in the filtered list
		return true;
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
			/>
			<ul id="todos">
				{sortedTodoList.map((todo) => (
					<TodoElement
						todo={todo}
						setIsOpen={setIsOpen}
						setModalTodo={setModalTodo}
					/>
				))}
			</ul>
		</div>
	);
}
