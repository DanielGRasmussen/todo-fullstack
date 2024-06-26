import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
	it("should render navigation bar and down arrow", () => {
		render(<Header />);

		// Assert that navigation bar is rendered
		const todoLink = screen.getByRole("link", { name: "Todo" });
		const inventoryLink = screen.getByRole("link", { name: "Inventory" });
		const shoppingLink = screen.getByRole("link", {
			name: "Shopping List"
		});
		expect(todoLink).toBeInTheDocument();
		expect(inventoryLink).toBeInTheDocument();
		expect(shoppingLink).toBeInTheDocument();

		// Assert that down arrow is rendered
		const downArrow = screen.getByAltText(
			"Down arrow to bring down header"
		);
		expect(downArrow).toBeInTheDocument();
	});

	it("should hide header and search bar on scroll down and show on scroll up", () => {
		// Part of the header grabs the search bar container and brings it up to the header.
		render(<div id="search-bar-container-container"></div>);
		render(<Header />);
		const header = document.querySelector("header");
		const searchBar = document.getElementById(
			"search-bar-container-container"
		);
		const downArrow = screen.getByAltText(
			"Down arrow to bring down header"
		);

		// Scroll down and verify that the header and search bar are hidden
		fireEvent.scroll(window, { target: { scrollY: 100 } });
		expect(header).toHaveClass("hide");
		expect(searchBar).toHaveClass("hide");
		expect(downArrow).not.toHaveClass("hide");

		// Scroll up and verify that the header and search bar are shown again
		fireEvent.scroll(window, { target: { scrollY: 0 } });
		expect(header).not.toHaveClass("hide");
		expect(searchBar).not.toHaveClass("hide");
		expect(downArrow).toHaveClass("hide");
	});
});
