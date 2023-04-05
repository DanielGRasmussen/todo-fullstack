import Notice from "../Notice";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("Notice component", () => {
	const noticeInfo = {
		type: "success",
		message: "Success message"
	};
	it("renders correctly with given props", () => {
		const { getByText, getByAltText } = render(
			<Notice
				noticeInfo={noticeInfo}
				hideNotice={jest.fn()}
				showNotice={true}
			/>
		);
		const notice = getByText(noticeInfo.message);
		expect(notice).toBeInTheDocument();
		expect(notice).toHaveClass(noticeInfo.type);
		expect(getByAltText("Close")).toBeInTheDocument();
	});

	it("hides the notice when the close button is clicked", () => {
		const hideNotice = jest.fn();
		const { getByAltText } = render(
			<Notice
				noticeInfo={noticeInfo}
				hideNotice={hideNotice}
				showNotice={true}
			/>
		);
		fireEvent.click(getByAltText("Close"));
		expect(hideNotice).toHaveBeenCalled();
	});

	it("does not render when showNotice is false", () => {
		const { queryByText, queryByAltText } = render(
			<Notice
				noticeInfo={noticeInfo}
				hideNotice={jest.fn()}
				showNotice={false}
			/>
		);
		expect(queryByText(noticeInfo.message)).toBeNull();
		expect(queryByAltText("Close")).toBeNull();
	});
});
