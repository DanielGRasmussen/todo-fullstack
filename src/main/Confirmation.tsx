import "./css/Confirmation.css";
import React from "react";

function Confirmation({
	confirmationInfo,
	hideConfirmation,
	showConfirmation
}): JSX.Element {
	if (!showConfirmation) return;
	return (
		<div id="confirmation-overlay">
			<div id="confirmation" className={confirmationInfo.type}>
				{confirmationInfo.message}
				<button onClick={hideConfirmation} id="cancel">
					Cancel
				</button>
				<button
					onClick={() => {
						hideConfirmation();
						confirmationInfo.next();
					}}
					id="confirm"
				>
					Yes
				</button>
			</div>
		</div>
	);
}

export default Confirmation;
