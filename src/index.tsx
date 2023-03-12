import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./header";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Header />
		<App />
		<footer></footer>
	</React.StrictMode>
);

// Pass a function to log results (for example: reportWebVitals(console.log))
reportWebVitals();
