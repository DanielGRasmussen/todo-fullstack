import React from "react";
import { render } from "@testing-library/react";
import SubTask from "../SubTask";

describe("SubTask component", () => {
	const subtask = {
		id: "1",
		name: "Subtask 1",
		link: false
	};

	it("renders the SubTask component correctly", () => {
		const { getByText, getByRole } = render(
			<SubTask
				subtask={subtask}
				setModalTodo={jest.fn()}
				dataChange={jest.fn()}
			/>
		);
		expect(getByText("Linked:")).toBeInTheDocument();
		expect(getByRole("checkbox")).not.toBeChecked();
		expect(getByText("Subtask 1")).toBeInTheDocument();
	});
});
