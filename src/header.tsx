import React, { useEffect } from "react";

function Header() {
	useEffect(() => {
		// Hide header on scroll
		let prevScrollpos = window.scrollY;
		const header = document.querySelector("header");
		const search_bar = document.getElementById(
			"search-bar-container-container"
		);
		window.onscroll = function () {
			const currentScrollPos = window.scrollY;
			if (prevScrollpos > currentScrollPos) {
				header.classList.remove("hide");
				search_bar.classList.remove("hide");
			} else {
				header.classList.add("hide");
				search_bar.classList.add("hide");
			}
			prevScrollpos = currentScrollPos;
		};
	}, []);

	return (
		<header>
			<div className="container">
				<nav>
					<ul>
						<li>
							<a href="#" className="active">
								All
							</a>
						</li>
						<li>
							<a href="#">General</a>
						</li>
						<li>
							<a href="#">Health</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
