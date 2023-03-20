import "./css/Notice.css";
import React from "react";

function Notice({ noticeInfo, hideNotice, showNotice }): JSX.Element {
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
			<div className="load"></div>
		</div>
	);
}

export default Notice;
