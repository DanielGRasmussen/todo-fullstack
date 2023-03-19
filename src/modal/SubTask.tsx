import React from "react";

function SubTask(subtask, dataChange) {
	return (
		<li
			onClick={(event) => {
				dataChange(event, "subtask");
			}}
		>
			{subtask}
		</li>
	);
}

export default SubTask;
