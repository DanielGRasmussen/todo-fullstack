import React from "react";
import { render } from "@testing-library/react";
import SearchMenu from "../SearchMenu";

describe("SearchMenu", () => {
	const setSearchQuery = jest.fn();
	const setSelectedSortingOption = jest.fn();
	const setStatusFilter = jest.fn();
	const setSortOrder = jest.fn();
	const setFilters = jest.fn();

	const props = {
		searchQuery: "Test Search Query",
		setSearchQuery,
		sortingOptions: [
			{ value: "option1", label: "Option 1" },
			{ value: "option2", label: "Option 2" }
		],
		selectedSortingOption: [{ value: "option1", label: "Option 1" }],
		setSelectedSortingOption,
		sortOrder: true,
		setSortOrder,
		currentStatusFilters: [{ value: "incomplete", label: "Incomplete" }],
		setStatusFilter,
		filterOptions: [
			{ value: "filter1", label: "Filter 1" },
			{ value: "filter2", label: "Filter 2" }
		],
		filters: [],
		setFilters
	};

	it("should render the component", () => {
		const { container } = render(<SearchMenu {...props} />);
		expect(container).toMatchSnapshot();
	});
});
