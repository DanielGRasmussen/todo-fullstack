import "./css/SearchMenu.css";
import React from "react";
import Select, { components } from "react-select";
import SortButton from "./SortButton";

function setTodoStyle(todoStyle: string): void {
	// Either "grid" or "list" should probably use an enum or boolean "isList" parameter.
	const todos = document.querySelector("#todos");
	if (!todos) {
		return;
	}
	// Gets the list style that this isn't.
	const other: string = todoStyle === "grid" ? "list" : "grid";
	todos.classList.remove(other);
	todos.classList.add(todoStyle);

	const selected: HTMLElement = document.querySelector(
		`#view-as .${todoStyle}`
	);
	const deselected: HTMLElement = document.querySelector(
		`#view-as .${other}`
	);
	selected.classList.add("active");
	deselected.classList.remove("active");
}

function SearchMenu(
	searchQuery: string,
	setSearchQuery,
	sortingOptions: { value: string; label: string }[],
	selectedSortingOption: { value: string; label: string },
	setSelectedSortingOption,
	handleSortOrderChange
): JSX.Element {
	const [uniqueId] = React.useState(
		() => "select_" + Math.random().toFixed(5).slice(2)
	);

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
			cursor: "pointer"
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
			width: "370px"
		})
	};

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
			<Select
				id={uniqueId}
				options={sortingOptions}
				value={selectedSortingOption}
				onChange={(option) => setSelectedSortingOption(option)}
				styles={selectStyles}
				components={{
					Menu: (props) => (
						<components.Menu
							children=""
							{...props}
							className="select-menu"
						/>
					)
				}}
				onMenuClose={() => {
					// Can't just do event handlers with class toggle and timeout
					// Menu reappears for a split second and animation goes ultra-fast if you do.
					const menu = document.querySelector(
						`#${uniqueId} .select-menu`
					);
					const container: HTMLElement = menu?.parentElement;
					const clonedMenu = menu?.cloneNode(true) as HTMLElement;

					if (!clonedMenu) return;

					clonedMenu.classList.add("select-menu-close");
					clonedMenu.addEventListener("animationend", () => {
						container?.removeChild(clonedMenu);
					});

					container?.appendChild(clonedMenu);
				}}
			/>
			<SortButton onClick={handleSortOrderChange} />
			<div id="view-as">
				<span className="tooltip">View as:</span>
				<div id="grid-container" className="tooltip">
					<img
						src={process.env.PUBLIC_URL + "/assets/grid.svg"}
						className="grid active"
						alt="Grid"
						onClick={() => setTodoStyle("grid")}
					/>
				</div>
				<div id="list-container" className="tooltip">
					<img
						src={process.env.PUBLIC_URL + "/assets/list.svg"}
						className="list"
						alt="List"
						onClick={() => setTodoStyle("list")}
					/>
				</div>
			</div>
		</form>
	);
}

export default SearchMenu;
