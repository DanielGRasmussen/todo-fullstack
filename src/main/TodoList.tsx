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

function TodoList(setIsOpen, setModalTodo, todoList): JSX.Element {
	// Gives the to-do list with sorting options
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
	const [sortOrder, setSortOrder] = useState(false);
	const [filters, setFilters] = useState([]);

	// Gets the unique types from todoList
	const filterOptions: { value: string; label: string }[] = Array.from(
		new Set(
			todoList.map((todo: ITodoData) => ({
				value: todo.type.toLowerCase(),
				label: todo.type.toLowerCase()
			}))
		)
	);

	// Search query is in it, and it's type is in filters (if there are any)
	const filteredTodoList: ITodoData[] = todoList.filter(
		(todo) =>
			todo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
			(filters.length === 0 ||
				filters.some(
					(option) => option.value === todo.type.toLowerCase()
				))
	);

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

	if (sortOrder) {
		sortedTodoList.reverse();
	}

	return (
		<div>
			{SearchMenu(
				searchQuery,
				setSearchQuery,
				sortingOptions,
				selectedSortingOption,
				setSelectedSortingOption,
				setSortOrder,
				filterOptions,
				filters,
				setFilters
			)}
			<ul id="todos">
				{sortedTodoList.map((todo) =>
					TodoElement(todo, setIsOpen, setModalTodo)
				)}
			</ul>
		</div>
	);
}

export default TodoList;
