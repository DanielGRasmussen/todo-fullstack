import "./css/Notice.css";
import React from "react";

interface INoticeProps {
	noticeInfo: {
		type: string;
		message: string;
	};
	hideNotice(): void;
	showNotice: boolean;
}

function Notice({
	noticeInfo,
	hideNotice,
	showNotice
}: INoticeProps): JSX.Element {
	/* This displays a notification message with a timer bar and close button.
	 *
	 * This component takes three props:
	 * noticeInfo - an object with two properties, type and message, type is added to the classes, message is the
	 * content of the message.
	 * hideNotice - a callback function that is called when the close button is clicked, which hides the notification.
	 * showNotice - a boolean flag that determines whether or not to show the notification.
	 *
	 * The component first checks if showNotice is false, in which case it returns nothing. Otherwise, it renders a div
	 * element with the id of "notice" and a class name equal to the type property of the noticeInfo object.
	 */
	if (!showNotice) return;
	return (
		<div id="notice" className={noticeInfo.type}>
			{noticeInfo.message}
			<img
				src={process.env.PUBLIC_URL + "/assets/close_x.svg"}
				alt="Close"
				onClick={hideNotice}
				className="close-notice"
			/>
			{/* Timer bar at bottom */}
			<div className="timer"></div>
		</div>
	);
}

export default Notice;
