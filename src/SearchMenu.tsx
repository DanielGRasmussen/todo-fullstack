import React, { useState } from "react";
import Select, { components } from "react-select";

function SortButton({ onClick }): JSX.Element {
	const [isDescending, setIsDescending] = useState(true);
	const [first, isFirst] = useState(true);

	// down arrow = descending = z to a
	const handleOnClick = (): void => {
		setIsDescending(!isDescending);
		isFirst(false);
		onClick(isDescending);
	};

	let sortBy: string;
	if (isDescending) {
		sortBy = "Ascending";
	} else {
		sortBy = "Descending";
	}

	// Swap between rotating it upside-down and downside-up
	const arrowStyle: { animation: string } = {
		animation: isDescending
			? "downside-up 0.3s linear forwards"
			: "upside-down 0.3s linear forwards"
	};
	// Since it requires the same type.
	const blankStyle: { animation: string } = { animation: "" };

	return (
		<div onClick={handleOnClick} id="sort-direction">
			{isDescending ? (
				<img
					src={
						process.env.PUBLIC_URL + first
							? "/assets/up_arrow.svg"
							: "/assets/down_arrow.svg"
					}
					alt="Ascending order"
					style={first ? blankStyle : arrowStyle}
					title={sortBy}
				/>
			) : (
				<img
					src={process.env.PUBLIC_URL + "/assets/up_arrow.svg"}
					alt="Descending order"
					style={arrowStyle}
					title={sortBy}
				/>
			)}
		</div>
	);
}

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
		<form id="menu">
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
				<span>View as:</span>
				<img
					src={process.env.PUBLIC_URL + "/assets/grid.svg"}
					className="grid active"
					alt="Grid"
					title="Grid"
					onClick={() => setTodoStyle("grid")}
				/>
				<img
					src={process.env.PUBLIC_URL + "/assets/list.svg"}
					className="list"
					alt="List"
					title="List"
					onClick={() => setTodoStyle("list")}
				/>
			</div>
		</form>
	);
}

export default SearchMenu;
