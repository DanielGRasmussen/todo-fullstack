import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoElement from "../TodoElement";
import { ITodoData } from "../TodoList";

describe("TodoElement component", () => {
	const mockTodo: ITodoData = {
		id: "1",
		created: new Date().toISOString(),
		proposedStartDate: new Date().toISOString(),
		actualStartDate: "",
		proposedEndDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
		actualEndDate: "",
		title: "Test Todo",
		description: "This is a test todo",
		type: "personal",
		subTasks: [],
		priority: "5",
		status: "incomplete",
		lastUpdated: new Date().toISOString()
	};
	const mockSetIsOpen = jest.fn();
	const mockSetModalTodo = jest.fn();

	beforeEach(() => {
		render(
			<TodoElement
				todo={mockTodo}
				setIsOpen={mockSetIsOpen}
				setModalTodo={mockSetModalTodo}
			/>
		);
	});

	it("renders the todo information", () => {
		expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
		expect(screen.getByText(mockTodo.type)).toBeInTheDocument();
		expect(
			screen.getByText(`Priority: ${mockTodo.priority}`)
		).toBeInTheDocument();
		expect(screen.getByText(mockTodo.description)).toBeInTheDocument();
		// Can't test date because stupid nonbreaking space (nbsp) character.
	});

	it("calls setIsOpen and setModalTodo when clicked", () => {
		userEvent.click(screen.getByRole("listitem"));
		expect(mockSetIsOpen).toHaveBeenCalledWith(true);
		expect(mockSetModalTodo).toHaveBeenCalledWith(mockTodo);
	});
});
