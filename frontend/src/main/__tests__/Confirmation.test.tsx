import Confirmation from "../Confirmation";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Confirmation", () => {
	test("renders the confirmation component with the given confirmation info and calls proper functions", () => {
		const mockNext = jest.fn();
		const confirmationInfo = {
			message: "Are you sure you want to confirm?",
			next: mockNext
		};
		const hideConfirmation = jest.fn();

		render(
			<Confirmation
				confirmationInfo={confirmationInfo}
				hideConfirmation={hideConfirmation}
				showConfirmation={true}
			/>
		);

		const confirmationElement = screen.getByText(
			confirmationInfo.message
		) as HTMLElement;

		const yesButton = screen.getByRole("button", { name: "Yes" });
		const cancelButton = screen.getByRole("button", { name: "No" });

		expect(confirmationElement).toBeInTheDocument();
		expect(yesButton).toBeInTheDocument();
		expect(cancelButton).toBeInTheDocument();

		fireEvent.click(cancelButton);
		expect(hideConfirmation).toHaveBeenCalledTimes(1);

		fireEvent.click(yesButton);
		expect(hideConfirmation).toHaveBeenCalledTimes(2);
		expect(mockNext).toHaveBeenCalledTimes(1);
	});

	test("does not render the confirmation component when showConfirmation is false", () => {
		const confirmationInfo = {
			message: "Are you sure you want to confirm?",
			next: jest.fn()
		};

		render(
			<Confirmation
				confirmationInfo={confirmationInfo}
				hideConfirmation={jest.fn()}
				showConfirmation={false}
			/>
		);

		expect(screen.queryByText(confirmationInfo.message)).toBeNull();
	});
});
