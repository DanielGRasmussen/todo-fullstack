import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
	it("should render navigation bar and down arrow", () => {
		render(<Header />);

		// Assert that navigation bar is rendered
		const todoLink = screen.getByRole("link", { name: /todo/i });
		const inventoryLink = screen.getByRole("link", { name: /inventory/i });
		const shoppingLink = screen.getByRole("link", {
			name: /shopping list/i
		});
		expect(todoLink).toBeInTheDocument();
		expect(inventoryLink).toBeInTheDocument();
		expect(shoppingLink).toBeInTheDocument();

		// Assert that down arrow is rendered
		const downArrow = screen.getByAltText(/down arrow/i);
		expect(downArrow).toBeInTheDocument();
	});

	it("should hide header and search bar on scroll down and show on scroll up", () => {
		render(<div id="search-bar-container-container"></div>);
		render(<Header />);
		const header = document.querySelector("header");
		const searchBar = document.getElementById(
			"search-bar-container-container"
		);

		// Scroll down and verify that the header and search bar are hidden
		fireEvent.scroll(window, { target: { scrollY: 100 } });
		expect(header).toHaveClass("hide");
		expect(searchBar).toHaveClass("hide");

		// Scroll up and verify that the header and search bar are shown again
		fireEvent.scroll(window, { target: { scrollY: 0 } });
		expect(header).not.toHaveClass("hide");
		expect(searchBar).not.toHaveClass("hide");
	});
});
