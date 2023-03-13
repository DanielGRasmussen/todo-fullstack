import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./header";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<div>
			<button
				id="skip-link"
				tabIndex={0}
				onClick={() => {
					document.querySelector("main").focus();
				}}
			>
				Skip to content
			</button>
			<Header />
			<App />
			<footer></footer>
		</div>
	</React.StrictMode>
);

// Pass a function to log results (for example: reportWebVitals(console.log))
reportWebVitals();
