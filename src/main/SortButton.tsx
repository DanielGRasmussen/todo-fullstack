import "./css/SortButton.css";
import React, { useState } from "react";

function SortButton({ onClick }): JSX.Element {
	const [isDescending, setIsDescending] = useState(true);
	const [first, isFirst] = useState(true);

	// down arrow = descending = z to a
	const handleOnClick = (): void => {
		setIsDescending(!isDescending);
		isFirst(false);
		onClick(isDescending);
	};

	let sortBy: string;
	if (isDescending) {
		sortBy = "Ascending";
	} else {
		sortBy = "Descending";
	}

	// Swap between rotating it upside-down and downside-up
	const arrowStyle: { animation: string } = {
		animation: isDescending
			? "downside-up 0.3s linear forwards"
			: "upside-down 0.3s linear forwards"
	};
	// Since it requires the same type.
	const blankStyle: { animation: string } = { animation: "" };

	return (
		<div onClick={handleOnClick} id="sort-direction">
			{isDescending ? (
				<img
					src={
						process.env.PUBLIC_URL + first
							? "/assets/up_arrow.svg"
							: "/assets/down_arrow.svg"
					}
					alt="Ascending order"
					style={first ? blankStyle : arrowStyle}
					title={sortBy}
				/>
			) : (
				<img
					src={process.env.PUBLIC_URL + "/assets/up_arrow.svg"}
					alt="Descending order"
					style={arrowStyle}
					title={sortBy}
				/>
			)}
		</div>
	);
}

export default SortButton;
