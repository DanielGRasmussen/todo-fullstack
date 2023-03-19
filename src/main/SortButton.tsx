import "./css/SortButton.css";
import React, { useState } from "react";

function SortButton({ onClick }): JSX.Element {
	const [isAscending, setIsAscending] = useState(true);
	const [first, isFirst] = useState(true);

	// up arrow   = ascending  = a to z
	// down arrow = descending = z to a
	const handleOnClick = (): void => {
		setIsAscending(!isAscending);
		isFirst(false);
		onClick(isAscending);
	};

	const arrowStyle: { animation: string } = {
		animation: isAscending
			? "downside-up 0.3s linear forwards"
			: "upside-down 0.3s linear forwards"
	};
	// Since it requires the same type.
	const blankStyle: { animation: string } = { animation: "" };

	return (
		<div
			onClick={handleOnClick}
			id="sort-direction"
			className={(isAscending ? "ascending" : "descending") + " tooltip"}
		>
			{isAscending ? (
				<img
					src={
						process.env.PUBLIC_URL + first
							? "/assets/up_arrow.svg"
							: "/assets/down_arrow.svg"
					}
					alt="Ascending order"
					style={first ? blankStyle : arrowStyle}
				/>
			) : (
				<img
					src={process.env.PUBLIC_URL + "/assets/up_arrow.svg"}
					alt="Descending order"
					style={arrowStyle}
				/>
			)}
		</div>
	);
}

export default SortButton;
