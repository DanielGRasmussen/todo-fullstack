import Notice from "../Notice";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("Notice component", () => {
	it("renders correctly with given props", () => {
		const noticeInfo = {
			type: "success",
			message: "Success message"
		};
		const hideNotice = jest.fn();
		const showNotice = true;
		const { getByText, getByAltText } = render(
			<Notice
				noticeInfo={noticeInfo}
				hideNotice={hideNotice}
				showNotice={showNotice}
			/>
		);
		expect(getByText(noticeInfo.message)).toBeInTheDocument();
		expect(getByAltText("Close")).toBeInTheDocument();
	});

	it("hides the notice when the close button is clicked", () => {
		const noticeInfo = {
			type: "success",
			message: "Success message"
		};
		const hideNotice = jest.fn();
		const showNotice = true;
		const { getByAltText } = render(
			<Notice
				noticeInfo={noticeInfo}
				hideNotice={hideNotice}
				showNotice={showNotice}
			/>
		);
		fireEvent.click(getByAltText("Close"));
		expect(hideNotice).toHaveBeenCalled();
	});

	it("does not render when showNotice is false", () => {
		const noticeInfo = {
			type: "success",
			message: "Success message"
		};
		const hideNotice = jest.fn();
		const showNotice = false;
		const { queryByText, queryByAltText } = render(
			<Notice
				noticeInfo={noticeInfo}
				hideNotice={hideNotice}
				showNotice={showNotice}
			/>
		);
		expect(queryByText(noticeInfo.message)).toBeNull();
		expect(queryByAltText("Close")).toBeNull();
	});
});
