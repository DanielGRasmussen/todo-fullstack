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
	const [first, isFirst] = useState<boolean>(true);

	// up arrow   = ascending  = a to z
	// down arrow = descending = z to a
	function handleOnClick(): void {
		const newSortOrder = !sortOrder;
		if (first) isFirst(false);
		setSortOrder(newSortOrder);
	}

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
			{/* public/assets/up_arrow.svg */}
			{sortOrder ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					enableBackground="new 0 0 50 150"
					viewBox="0 0 50 150"
					style={first ? blankStyle : arrowStyle}
				>
					<g>
						<line
							y2="24.964"
							x1="23.871"
							x2="23.871"
							stroke="#000"
							strokeMiterlimit="10"
							y1="149"
							strokeWidth="6"
						/>
						<polygon points="42.292 25.87 3.969 25.87 24.885 1.917" />
					</g>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					enableBackground="new 0 0 50 150"
					viewBox="0 0 50 150"
					style={arrowStyle}
				>
					<g>
						<line
							y2="24.964"
							x1="23.871"
							x2="23.871"
							stroke="#000"
							strokeMiterlimit="10"
							y1="149"
							strokeWidth="6"
						/>
						<polygon points="42.292 25.87 3.969 25.87 24.885 1.917" />
					</g>
				</svg>
			)}
		</div>
	);
}

export default SortButton;
