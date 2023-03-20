import "./css/SearchMenu.css";
import React from "react";
import makeAnimated from "react-select/animated";
import Select, { components } from "react-select";
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

function SearchMenu(
	searchQuery: string,
	setSearchQuery,
	sortingOptions: { value: string; label: string }[],
	selectedSortingOption: { value: string; label: string }[],
	setSelectedSortingOption,
	handleSortOrderChange,
	filterOptions: { value: string; label: string }[],
	filters: string[],
	setFilters
): JSX.Element {
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
				id="filter-select"
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
				/>
				<SortButton onClick={handleSortOrderChange} />
			</div>
		</form>
	);
}

export default SearchMenu;
