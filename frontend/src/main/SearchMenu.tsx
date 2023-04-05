import "./css/SearchMenu.css";
import React, { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SortButton from "./SortButton";

const animatedComponents = makeAnimated();
const customComponents = {
	Menu: (props) => (
		<components.Menu children="" {...props} className="select-menu" />
	)
};

function select_on_close(uniqueId: string): void {
	// Can't just do event handlers with class toggle and timeout
	// Menu reappears for a split second and animation goes ultra-fast if you do.
	const menu: Element = document.querySelector(`#${uniqueId} .select-menu`);
	const container: HTMLElement = menu?.parentElement;
	const clonedMenu: HTMLElement = menu?.cloneNode(true) as HTMLElement;

	if (!clonedMenu) return;

	clonedMenu.classList.add("select-menu-close");
	clonedMenu.addEventListener("animationend", () => {
		container?.removeChild(clonedMenu);
	});

	container?.appendChild(clonedMenu);
}

interface ISearchMenu {
	searchQuery: string;
	setSearchQuery;
	sortingOptions: { value: string; label: string }[];
	selectedSortingOption: { value: string; label: string }[];
	setSelectedSortingOption;
	sortOrder: boolean;
	setSortOrder;
	currentStatusFilters: { value: string; label: string }[];
	setStatusFilter;
	filterOptions: { value: string; label: string }[];
	filters: string[];
	setFilters;
	currentTimeframe: { value: string; label: string };
	setCurrentTimeframe;
	startDate;
	setStartDate;
	endDate;
	setEndDate;
}

function SearchMenu({
	searchQuery,
	setSearchQuery,
	sortingOptions,
	selectedSortingOption,
	setSelectedSortingOption,
	sortOrder,
	setSortOrder,
	currentStatusFilters,
	setStatusFilter,
	filterOptions,
	filters,
	setFilters,
	currentTimeframe,
	setCurrentTimeframe,
	startDate,
	setStartDate,
	endDate,
	setEndDate
}: ISearchMenu): JSX.Element {
	/* This renders the search menu with options to filter for the TodoList
	 *
	 * This component takes twelve props:
	 * searchQuery: The current search query entered by the user.
	 * setSearchQuery: A function to update the search query based on user input.
	 * sortingOptions: An array of sorting options to be displayed in the sorting dropdown menu.
	 * selectedSortingOption: The currently selected sorting option.
	 * setSelectedSortingOption: A function to update the selected sorting option based on user selection.
	 * sortOrder: The current sorting order (ascending or descending).
	 * setSortOrder: A function to update the sorting order based on user selection.
	 * currentStatusFilters: The currently selected status filters.
	 * setStatusFilter: A function to update the selected status filters based on user selection.
	 * filterOptions: An array of filter options to be displayed in the type filter dropdown menu.
	 * filters: The currently selected type filters.
	 * setFilters: A function to update the selected type filters based on user selection.
	 * currentTimeframe: The currently selected timeframe.
	 * setCurrentTimeframe: A function to update the selected type timeframe based on user selection.
	 *
	 * The component returns a form with several search inputs such as a search bar, a select dropdown for status
	 * filters, a select dropdown for type filters, and a select dropdown for sorting options. The form also includes a
	 * button to toggle the sort order.
	 */
	const [filterOpen, setfilterOpen] = useState(false);
	const [sortOpen, setsortOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	function toggleFilters() {
		setfilterOpen(!filterOpen);
	}

	function toggleSorts() {
		setsortOpen(!sortOpen);
	}

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

	// Makes react-select thinner
	const selectStyles = {
		control: (provided) => ({
			...provided,
			background: "#fff",
			borderColor: "#9e9e9e",
			minHeight: "50px",
			height: "50px",
			boxShadow: null,
			width: "370px",
			cursor: "pointer",
			textTransform: "capitalize"
		}),
		valueContainer: (provided) => ({
			...provided,
			height: "30px",
			padding: "0 6px"
		}),
		indicatorSeparator: () => ({
			display: "none"
		}),
		indicatorsContainer: (provided) => ({
			...provided,
			height: "40px",
			marginTop: "5px"
		}),
		menu: (provided) => ({
			...provided,
			marginTop: "-5px",
			width: "370px",
			textTransform: "capitalize"
		})
	};

	function dateSelectionChange(dates) {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	}

	const statusOptions = [
		{ value: "incomplete", label: "Incomplete" },
		{ value: "in-progress", label: "In-Progress" },
		{ value: "complete", label: "Complete" }
	];

	const timeframeOptions = [
		{ value: "behind", label: "Behind" },
		{ value: "today", label: "Today" },
		{ value: "tomorrow", label: "Tomorrow" },
		{ value: "week", label: "This week" },
		{ value: "month", label: "This month" },
		{ value: "year", label: "This year" },
		{ value: "all", label: "All" }
	];

	const filterHeader = <h2 id="filters-label">Filters</h2>;
	const filterElements = (
		<>
			<div id="status">
				<label htmlFor="status-filter">Status filter:</label>
				<Select
					id="status-filter"
					options={statusOptions}
					value={currentStatusFilters}
					onChange={(options) => setStatusFilter(options)}
					styles={selectStyles}
					isMulti
					components={{ ...animatedComponents, ...customComponents }}
					onMenuClose={() => {
						select_on_close("status-filter");
					}}
				/>
			</div>
			<div id="type">
				<label htmlFor="type-filter">Type filter:</label>
				<Select
					id="type-filter"
					options={filterOptions}
					value={filters}
					onChange={(options) => setFilters(options)}
					styles={selectStyles}
					isMulti
					components={{ ...animatedComponents, ...customComponents }}
					onMenuClose={() => {
						select_on_close("filter-select");
					}}
				/>
			</div>
			<div id="datepicker-wrapper">
				{/* For the clearing element. */}
				<label htmlFor="datepicker">Date range:</label>
				<DatePicker
					selected={startDate}
					onChange={dateSelectionChange}
					startDate={startDate}
					endDate={endDate}
					selectsRange
					isClearable
					placeholderText="Select date range"
					id="datepicker"
				/>
			</div>
			<div id="time">
				<label htmlFor="timeframe">Timeframe:</label>
				<Select
					id="timeframe"
					options={timeframeOptions}
					value={currentTimeframe}
					onChange={(option) => setCurrentTimeframe(option)}
					styles={selectStyles}
					isSearchable={false}
					components={{ ...animatedComponents, ...customComponents }}
					onMenuClose={() => {
						select_on_close("timeframe");
					}}
				/>
			</div>
		</>
	);

	const filtersDropdown = (
		<div className="dropdown-item">
			<div className="dropdown-item-header" onClick={toggleFilters}>
				{filterHeader}
				<span className={`arrow ${filterOpen ? "up" : "down"}`} />
			</div>

			<div
				className={`dropdown-item-content filters ${
					filterOpen ? "show" : null
				}`}
			>
				{filterElements}
			</div>
		</div>
	);

	const sortHeader = <h2 id="sorts-label">Sorts</h2>;
	const sortElements = (
		<div id="sorts">
			<Select
				id="sort-select"
				options={sortingOptions}
				value={selectedSortingOption}
				onChange={(options) => setSelectedSortingOption(options)}
				styles={selectStyles}
				isMulti
				components={{ ...animatedComponents, ...customComponents }}
				onMenuClose={() => {
					select_on_close("sort-select");
				}}
				placeholder="Sort options"
			/>
			<SortButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
		</div>
	);

	const sortDropdown = (
		<div className="dropdown-item">
			<div className="dropdown-item-header" onClick={toggleSorts}>
				{sortHeader}
				<span className={`arrow ${sortOpen ? "up" : "down"}`} />
			</div>

			<div
				className={`dropdown-item-content sorts ${
					sortOpen ? "show" : null
				}`}
			>
				{sortElements}
			</div>
		</div>
	);

	return (
		<form id="menu" autoComplete="off">
			<div id="search-bar-container-container">
				{/* First container for absolute positioning and 100% width */}
				<section id="search-bar-container">
					{/*
					 * Second container to be the same width as the header/main then use margins to move it. (Fancy CSS could probably replace that)
					 * Section instead of div because my IDE and ESLint didn't agree on how it should be formatted.
					 * This was not passed into the header function because the functions this calls on didn't to update the screen.
					 */}
					<input
						id="search-bar"
						type="text"
						value={searchQuery}
						onChange={(event) => setSearchQuery(event.target.value)}
						placeholder="Search..."
					/>
				</section>
			</div>
			{windowWidth > 800 ? filterHeader : null}
			{windowWidth < 800 ? filtersDropdown : filterElements}
			{windowWidth > 800 ? sortHeader : null}
			{windowWidth < 800 ? sortDropdown : sortElements}
		</form>
	);
}

export default SearchMenu;
