import "./css/SortButton.css";
import React, { useState } from "react";

interface ISortButtonProps {
	sortOrder: boolean;
	setSortOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

function SortButton({
	sortOrder,
	setSortOrder
}: ISortButtonProps): JSX.Element {
	/* This renders a button to sort a list in either ascending or descending order.
	 *
	 * This component takes two props:
	 * sortOrder: a boolean flag that is ascending/true by default.
	 * setSortOrder: a function used to update the current sort order.
	 *
	 * This component returns a div element with an onClick handler that triggers the handleOnClick function and toggles
	 * the sort order. The div contains an img element with the up arrow icon, which changes based on the current sort
	 * order.
	 */
	const [first, isFirst] = useState(true);

	// up arrow   = ascending  = a to z
	// down arrow = descending = z to a
	const handleOnClick = (): void => {
		const newSortOrder = !sortOrder;
		isFirst(false);
		setSortOrder(newSortOrder);
	};

	const arrowStyle: { animation: string } = {
		animation: sortOrder
			? "downside-up 0.3s linear forwards"
			: "upside-down 0.3s linear forwards"
	};
	// Since it requires the same type.
	const blankStyle: { animation: string } = { animation: "" };

	return (
		<div
			onClick={handleOnClick}
			id="sort-direction"
			className={(sortOrder ? "ascending" : "descending") + " tooltip"}
		>
			{sortOrder ? (
				<img
					src={process.env.PUBLIC_URL + "/assets/up_arrow.svg"}
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
