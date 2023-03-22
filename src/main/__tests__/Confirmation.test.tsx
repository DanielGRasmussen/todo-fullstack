import Confirmation from "../Confirmation";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Confirmation", () => {
	test("renders the confirmation component with the given confirmation info", () => {
		const confirmationInfo = {
			message: "Are you sure you want to confirm?",
			next: jest.fn()
		};
		const hideConfirmation = jest.fn();
		const showConfirmation = true;

		render(
			<Confirmation
				confirmationInfo={confirmationInfo}
				hideConfirmation={hideConfirmation}
				showConfirmation={showConfirmation}
			/>
		);

		const confirmationElement = screen.getByText(
			confirmationInfo.message
		) as HTMLElement;

		expect(confirmationElement).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Cancel/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Yes/i })
		).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
		expect(hideConfirmation).toHaveBeenCalledTimes(1);

		fireEvent.click(screen.getByRole("button", { name: /Yes/i }));
		expect(hideConfirmation).toHaveBeenCalledTimes(2);
		expect(confirmationInfo.next).toHaveBeenCalledTimes(1);
	});

	test("does not render the confirmation component when showConfirmation is false", () => {
		const confirmationInfo = {
			message: "Are you sure you want to confirm?",
			next: jest.fn()
		};
		const hideConfirmation = jest.fn();
		const showConfirmation = false;

		render(
			<Confirmation
				confirmationInfo={confirmationInfo}
				hideConfirmation={hideConfirmation}
				showConfirmation={showConfirmation}
			/>
		);

		expect(screen.queryByText(confirmationInfo.message)).toBeNull();
	});
});
