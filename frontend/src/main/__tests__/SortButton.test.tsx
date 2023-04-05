import SortButton from "../SortButton";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("SortButton", () => {
	it("should render correctly", () => {
		const { container } = render(
			<SortButton sortOrder={true} setSortOrder={jest.fn()} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should change sort order when clicked", () => {
		const setSortOrderMock = jest.fn();
		render(<SortButton sortOrder={true} setSortOrder={setSortOrderMock} />);
		const button = document.getElementById("sort-direction");
		fireEvent.click(button);
		expect(setSortOrderMock).toHaveBeenCalledWith(false);
	});
});
