import React, { useState, useEffect } from "react";
import { getToDoList } from "./ExternalServices";
import SearchMenu from "./SearchMenu";

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
	subTasks: string[];
	priority: string;
	status: string;
	lastUpdated: string;
}

interface TodoElementProps {
	todo: ITodoData;
}

function TodoElement({ todo }: TodoElementProps): JSX.Element {
	return (
		<li className={`todo-item ${todo.status} ${todo.type}`}>
			<h3>{todo.title}</h3>
			<p className="priority">Priority: {todo.priority}</p>
			<p className="completion-date">
				Completion date:{" "}
				{
					new Date(todo.proposedEndDate).toLocaleString("en-US", {
						month: "numeric",
						day: "numeric",
						year: "numeric",
						hour: "numeric",
						minute: "numeric",
						hour12: true
					})
					// Convert ISO to date
				}
			</p>
			<p className="description">{todo.description}</p>
		</li>
	);
}

function TodoList(): JSX.Element {
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
	const [todoList, setTodoList] = useState<ITodoData[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedSortingOption, setSelectedSortingOption] = useState(
		sortingOptions[0]
	);
	const [sortOrder, setSortOrder] = useState(false);

	useEffect(() => {
		const fetchTodoList = async () => {
			const fetchedList: ITodoData[] = await getToDoList();
			setTodoList(fetchedList);
		};
		fetchTodoList();
	}, []);

	const filteredTodoList: ITodoData[] = todoList.filter((todo) =>
		todo.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const sortedTodoList: ITodoData[] = filteredTodoList.sort((a, b) => {
		const aValue: string = a[selectedSortingOption.value];
		const bValue: string = b[selectedSortingOption.value];
		if (aValue < bValue) {
			return -1;
		}
		if (aValue > bValue) {
			return 1;
		}
		return 0;
	});

	if (sortOrder) {
		sortedTodoList.reverse();
	}

	const handleSortOrderChange = (newSortOrder): void => {
		setSortOrder(newSortOrder);
	};

	return (
		<div>
			{SearchMenu(
				searchQuery,
				setSearchQuery,
				sortingOptions,
				selectedSortingOption,
				setSelectedSortingOption,
				handleSortOrderChange
			)}
			<ul id="todos" className="grid">
				{sortedTodoList.map((todo) => (
					<TodoElement key={todo.id} todo={todo} />
				))}
			</ul>
		</div>
	);
}

export default TodoList;
