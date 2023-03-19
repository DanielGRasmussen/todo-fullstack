import "./css/Header.css";
import React, { useEffect, useState } from "react";
import { clickAnywhere } from "../utils";

function NavItem({ name, active = false }): JSX.Element {
	return (
		<li>
			<a href="src#" className={active ? "active" : ""}>
				{name}
			</a>
		</li>
	);
}

function Header() {
	// eslint-disable-next-line no-unused-vars
	const [active, setActive] = useState("inventory");
	const [isOpen, setIsOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		// Hide header on scroll
		let prevScrollpos: number = window.scrollY;
		const header: HTMLElement = document.querySelector("header");
		const search_bar: HTMLElement = document.getElementById(
			"search-bar-container-container"
		);
		const down_arrow: HTMLElement = document.getElementById("down_arrow");

		// Separate functions in case somehow something breaks, easier for user to fix
		function showHeader() {
			header.classList.remove("hide");
			search_bar.classList.remove("hide");
			if (down_arrow) {
				down_arrow.classList.add("hide");
			}
		}

		function hideHeader() {
			header.classList.add("hide");
			search_bar.classList.add("hide");
			if (down_arrow) {
				down_arrow.classList.remove("hide");
			}
		}

		if (down_arrow) {
			down_arrow.addEventListener("click", () => {
				showHeader();
			});
		}

		window.onscroll = function () {
			const currentScrollPos: number = window.scrollY;
			if (prevScrollpos > currentScrollPos) showHeader();
			else hideHeader();
			prevScrollpos = currentScrollPos;
		};

		// Close navigation menu when clicked outside
		function clickedElsewhere() {
			setIsOpen(false);
		}

		const nav: HTMLElement = document.querySelector("nav");
		const hamburger: HTMLElement = document.getElementById("hamburger");
		clickAnywhere([nav, hamburger], clickedElsewhere);

		// Reload this function when window size changes
		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
		});
	}, []);

	const NavUl = (
		<ul>
			<NavItem name="Todo" active={"todo" === active} />
			<NavItem name="Inventory" active={"inventory" === active} />
			<NavItem name="Shopping List" active={"shopping" === active} />
		</ul>
	);

	// Header with nav
	if (windowWidth > 800) {
		return (
			<header>
				<img
					src={`${process.env.PUBLIC_URL}/assets/drag_down_arrow.svg`}
					alt="Down arrow to bring down header"
					id="down_arrow"
					className="hide"
				/>
				<div className="container">
					<nav>{NavUl}</nav>
				</div>
			</header>
		);
	}
	// Header with hamburger button then nav
	return (
		<header>
			<a href="/" className="icon">
				<img
					src={`${process.env.PUBLIC_URL}/assets/icon.svg`}
					alt="Logo"
				/>
			</a>
			<img
				src={`${process.env.PUBLIC_URL}/assets/hamburger_button.svg`}
				id="hamburger"
				alt="Hamburger Button"
				onClick={() => setIsOpen(!isOpen)}
			/>
			<nav className={isOpen ? "open" : ""}>
				<a href="/" className="icon">
					<img
						src={`${process.env.PUBLIC_URL}/assets/icon.svg`}
						alt="Logo"
					/>
				</a>
				{NavUl}
			</nav>
		</header>
	);
}

export default Header;
