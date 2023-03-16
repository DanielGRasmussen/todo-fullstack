import "./css/Header.css";
import React, { useEffect, useState } from "react";
import { ITodoData } from "../main/TodoList";
import { getToDoList } from "../ExternalServices";

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
	const [todoList, setTodoList] = useState<ITodoData[]>([]);
	const [active, setActive] = useState("all");
	const [isOpen, setIsOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		// To get the data
		const fetchTodoList = async () => {
			const fetchedList: ITodoData[] = await getToDoList();
			setTodoList(fetchedList);
		};
		fetchTodoList();

		// Hide header on scroll
		let prevScrollpos: number = window.scrollY;
		const header: Element = document.querySelector("header");
		const search_bar: Element = document.getElementById(
			"search-bar-container-container"
		);
		window.onscroll = function () {
			const currentScrollPos: number = window.scrollY;
			if (prevScrollpos > currentScrollPos) {
				header.classList.remove("hide");
				search_bar.classList.remove("hide");
			} else {
				header.classList.add("hide");
				search_bar.classList.add("hide");
			}
			prevScrollpos = currentScrollPos;
		};

		// Close navigation menu when clicked outside
		window.addEventListener("click", (event) => {
			const nav: Element = document.querySelector("nav");
			const hamburger: Element = document.getElementById("hamburger");
			if (
				!(
					nav.contains(event.target as Node) ||
					hamburger.contains(event.target as Node)
				)
			) {
				setIsOpen(false);
			}
		});

		// Reload this function when window size changes
		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
		});
	}, []);

	// Gets the unique types from todoList
	const uniqueTypes: string[] = Array.from(
		new Set(todoList.map((todo: ITodoData) => todo.type.toLowerCase()))
	);
	uniqueTypes.unshift("all");

	if (active === "all") {
		setActive("general");
	}

	const NavUl = (
		<ul>
			{uniqueTypes.map((type) => (
				<NavItem key={type} name={type} active={type === active} />
			))}
		</ul>
	);

	// Header with nav
	if (windowWidth > 800) {
		return (
			<header>
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
