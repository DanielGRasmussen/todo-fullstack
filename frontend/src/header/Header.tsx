import "./css/Header.css";
import React, { useEffect, useState } from "react";
import { clickAnywhere } from "../utils";
import { IUserInfo } from "../DataInterfaces";
import { getUserInfo, logout } from "../ExternalServices";

function NavItem({ name, active = false }): JSX.Element {
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
	const [active] = useState("todo");
	const [isOpen, setIsOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [userInfo, setUserInfo] = useState<IUserInfo>({
		"googleId": "",
		"_id": "",
		"name": "",
		"email": "",
		"picture": process.env.PUBLIC_URL + "/images/default-profile-picture.png",
	});
	const loggedIn = userInfo.googleId !== "";

	function toggleHeader(header: HTMLElement, search_bar: HTMLElement, down_arrow: HTMLElement, show: boolean) {
		header.classList.toggle("hide", !show);
		search_bar.classList.toggle("hide", !show);
		if (down_arrow) {
			down_arrow.classList.toggle("hide", show);
		}
	}

	useEffect(() => {
		// Get user info
		getUserInfo().then((data) => {
			setUserInfo(data);
		});

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

		clickAnywhere([], clickedElsewhere, ["nav", "#hamburger"]);

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
			<nav>{NavUl}</nav>
			<a href="/" className="icon">
				<img src={`${process.env.PUBLIC_URL}/assets/icon.svg`} alt="Logo" />
			</a>
			<img
				src={`${process.env.PUBLIC_URL}/assets/hamburger_button.svg`}
				id="hamburger"
				alt="Hamburger Button"
				onClick={() => setIsOpen(!isOpen)}
			/>
			{/* Wrapper so that user can click on right without it triggering modal */}
			<div className={`${isOpen ? "open" : null} wrapper`}>
				<nav className={isOpen ? "open" : null}>
					<div id="login-info" className={loggedIn ? "logged-in" : null}>
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
