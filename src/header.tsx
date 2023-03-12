import React, { useEffect } from "react";
import "./styles.css";

function Header() {
	useEffect(() => {
		// Hide header on scroll
		let prevScrollpos = window.pageYOffset;
		window.onscroll = function () {
			const currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
				document.querySelector("header").classList.remove("hide");
			} else {
				document.querySelector("header").classList.add("hide");
			}
			prevScrollpos = currentScrollPos;
		};
	}, []);

	return (
		<header>
			<nav>
				<ul>
					<li>
						<a href="#">All</a>
					</li>
					<li>
						<a href="#">General</a>
					</li>
					<li>
						<a href="#">Health</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
