import "./css/Header.css";
import React, { useEffect, useState } from "react";
import { clickAnywhere } from "../utils";
import { IUserInfo } from "../DataInterfaces";
import { getUserInfo, logout } from "../ExternalServices";

function NavItem({ name, active = false }: { name: string, active: boolean }): JSX.Element {
	return (
		<li>
			<a href="#" className={active ? "active" : null}>
				{name}
			</a>
		</li>
	);
}

function Header() : JSX.Element {
	/* The Header component uses the useState hook to keep track of the current window width and whether or not the
	 * navigation menu is open. It also uses the useEffect hook to add event listeners for scrolling and resizing the
	 * window. It also has some logic for showing and hiding elements based on user interaction with the page. For
	 * example, when the user scrolls down, it hides the header and search bar elements. When they scroll up again, it
	 * shows these elements again.
	 */
	const [active] = useState<string>("todo");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

	const [userInfo, setUserInfo] = useState<IUserInfo>(JSON.parse(sessionStorage.getItem("userInfo") ||
		"{ \"googleId\": \"\", \"_id\": \"\", \"name\": \"\", \"email\": \"\", \"picture\": \"/assets/default-profile-picture.svg\" }"
	));
	const loggedIn: boolean = userInfo.googleId !== "";

	function toggleHeader(header: HTMLElement, search_bar: HTMLElement, down_arrow: HTMLElement, show: boolean) {
		header.classList.toggle("hide", !show);
		search_bar.classList.toggle("hide", !show);
		if (down_arrow) {
			down_arrow.classList.toggle("hide", show);
		}
	}

	useEffect(() => {
		// Get user info
		try {
			getUserInfo().then(setUserInfo);
		} catch (error) {
			// Do nothing, the same thing is being done in Main, but it notifies the user and logs to console.
		}

		// Hide header on scroll
		let prevScrollpos: number = window.scrollY;
		const header: HTMLElement = document.querySelector("header");
		const search_bar: HTMLElement = document.getElementById("search-bar-container-container");
		const down_arrow: HTMLElement = document.getElementById("down_arrow");

		if (down_arrow) {
			down_arrow.addEventListener("click", () => {
				toggleHeader(header, search_bar, down_arrow, true);
			});
		}

		function handleScroll() {
			const currentScrollPos: number = window.scrollY;
			toggleHeader(header, search_bar, down_arrow, prevScrollpos > currentScrollPos);
			prevScrollpos = currentScrollPos;
		}

		window.addEventListener("scroll", handleScroll);

		function clickedElsewhere() {
			setIsOpen(false);
		}

		clickAnywhere([], clickedElsewhere, ["nav", "#hamburger", "#login-info"]);

		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
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
				{/* public/assets/drag_down_arrow.svg */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="12"
					viewBox="0 0 24 12"
					id="down_arrow"
					className="hide"
				>
					<line x1="4" y1="4" x2="12.5" y2="10" stroke="white" strokeWidth="2"/>
					<line x1="11.5" y1="10" x2="20" y2="4" stroke="white" strokeWidth="2"/>
				</svg>
				<div className="container">
					<nav>{NavUl}</nav>
				</div>
			</header>
		);
	}

	// Header with hamburger button then nav
	return (
		<header>
			<nav>{NavUl}</nav>
			<a href="/" className="icon">
				<img src={`${process.env.PUBLIC_URL}/assets/icon.svg`} alt="Logo" />
			</a>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				width="20"
				height="20"
				id="hamburger"
				onClick={() => setIsOpen(!isOpen)}
			>
				<line x1="0" y1="4" x2="20" y2="4" stroke="white" strokeWidth="2"/>
				<line x1="0" y1="10" x2="20" y2="10" stroke="white" strokeWidth="2"/>
				<line x1="0" y1="16" x2="20" y2="16" stroke="white" strokeWidth="2"/>
			</svg>
			{/* Wrapper so that user can click on right without it triggering modal */}
			<div className={`${isOpen ? "open" : null} wrapper`}>
				<nav className={isOpen ? "open" : null}>
					<div id="login-info" className={loggedIn ? "logged-in" : "logged-out"}>
						{loggedIn ? (
							<>
								<img src={`${userInfo.picture}`} alt="Google profile picture" />
								<div id="profile-info">
									<a className="signing" id="sign-in" onClick={logout}>
										Sign out
									</a>
									<div id="user-name">Welcome {userInfo.name.split(" ")[0]}!</div>
									<div id="user-email">{userInfo.email}</div>
								</div>
							</>
						) : <a href="/auth" className="signing" id="sign-in">
							Sign in
						</a>}
					</div>
					{NavUl}
				</nav>
			</div>
		</header>
	);
}

export default Header;
