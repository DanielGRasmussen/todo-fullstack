import "./css/Confirmation.css";
import React from "react";

interface IConfirmationProps {
	confirmationInfo: {
		message: string;
		next: () => void;
	};
	hideConfirmation: () => void;
	showConfirmation: boolean;
}

function Confirmation({
	confirmationInfo,
	hideConfirmation,
	showConfirmation
}: IConfirmationProps): JSX.Element {
	/* This renders a confirmation dialog with a message and two buttons: "Cancel" and "Yes".
	 *
	 * This component takes three props:
	 * confirmationInfo: an object with two properties, message and next, message is the content of the confirmation,
	 * next is a function that will be called when the "Yes" button is clicked.
	 * hideConfirmation: a callback function that is called when an option is selected and hides the confirmation.
	 * showConfirmation: a boolean flag that determines whether or not to show the confirmation.
	 *
	 * This component first checks if showConfirmation is false, in which case it returns nothing. Otherwise, it renders
	 * a confirmation dialog with the message from confirmationInfo displayed as text, a "Cancel" button, and a "Yes"
	 * button.
	 *
	 * When the "Cancel" button is clicked, hideConfirmation is called to hide the dialog. When the "Yes" button is
	 * clicked, hideConfirmation is called to hide the dialog and confirmationInfo.next is called to perform the action
	 * specified in next.
	 */
	if (!showConfirmation) return;
	return (
		<div id="confirmation-overlay">
			<div id="confirmation">
				{confirmationInfo.message}
				<button onClick={hideConfirmation} id="cancel">
					No
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
