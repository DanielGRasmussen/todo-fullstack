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

	useEffect(() => {
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
	}, []);

	// To get the data
	useEffect(() => {
		const fetchTodoList = async () => {
			const fetchedList: ITodoData[] = await getToDoList();
			setTodoList(fetchedList);
		};
		fetchTodoList();
	}, []);

	// Gets the unique types from todoList
	const uniqueTypes: string[] = Array.from(
		new Set(todoList.map((todo: ITodoData) => todo.type.toLowerCase()))
	);
	uniqueTypes.unshift("all");

	return (
		<header>
			<div className="container">
				<nav>
					<ul>
						{uniqueTypes.map((type) => (
							<NavItem
								key={type}
								name={type}
								active={type === active}
							/>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
