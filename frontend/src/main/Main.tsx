import "./css/Main.css";
import React, { useEffect, useState } from "react";
import { TodoList } from "./TodoList";
import { Modal } from "../modal/Modal";
import { getToDoList, getUserInfo } from "../ExternalServices";
import Notice from "./Notice";
import { sleep } from "../utils";
import Confirmation from "./Confirmation";
import ITodoData, { IUserInfo } from "../DataInterfaces";

function Main(): JSX.Element {
	const [todoList, setTodoList] = useState<ITodoData[]>(JSON.parse(sessionStorage.getItem("todos") || "[]"));
	const [isOpen, setIsOpen] = useState<boolean>(false); 	// Modal isOpen
	const [modalTodo, setModalTodo] = useState<ITodoData | Record<string, never>>({}); // Record<string, never> = empty object
	const [modalCreate, setModalCreate] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<IUserInfo>(JSON.parse(sessionStorage.getItem("userInfo") ||
		"{ \"googleId\": \"\", \"_id\": \"\", \"name\": \"\", \"email\": \"\", \"picture\": \"/assets/default-profile-picture.svg\" }"
	));
	const [showNotice, setShowNotice] = useState<boolean>(false);
	const [noticeInfo, setNoticeInfo] = useState<{type: string, message: string}>({ type: "", message: "" });
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [confirmationInfo, setConfirmationInfo] = useState<{
		message: string;
		next(): void;
	}>({
		message: "",
		// Typing stuffs
		next: function () {
			0;
		}
	});
	const loggedIn: boolean = userInfo.googleId !== "";

	function startNotice(noticeType: string, noticeMessage: string): void {
		setNoticeInfo({ type: noticeType, message: noticeMessage });
		setShowNotice(true);
		setTimeout(() => hideNotice(), 2000);
	}

	function hideNotice(): void {
		const notice: HTMLElement = document.getElementById("notice");
		if (notice) {
			notice.classList.add("close");
			sleep(700).then(() => {
				setShowNotice(false);
			});
		}
	}

	function askConfirmation(noticeMessage: string, confirmationNext: () => void): void {
		setConfirmationInfo({
			message: noticeMessage,
			next: confirmationNext
		});
		setShowConfirmation(true);
	}

	function hideConfirmation(): void {
		const confirmationOverlay: HTMLElement = document.getElementById("confirmation-overlay");
		if (confirmationOverlay) {
			confirmationOverlay.classList.add("close");
			sleep(190).then(() => {
				setShowConfirmation(false);
			});
		}
	}

	function createTodo(): void {
		setModalCreate(true);
		setModalTodo({
			_id: "",
			created: "",
			proposedStartDate: "",
			actualStartDate: "",
			proposedEndDate: "",
			actualEndDate: "",
			title: "",
			description: "",
			type: "",
			subTasks: [],
			parentTask: "",
			recurring: {
				isRecurring: false
			},
			priority: "",
			status: "incomplete",
			lastUpdated: ""
		});
		setIsOpen(true);
	}

	async function fetchTodoList(local = false): Promise<void> {
		try {
			let fetchedList: ITodoData[];
			if (local) {
				// Retrieve todo list from session storage
				const sessionData = sessionStorage.getItem("todos");
				if (sessionData) {
					try {
						fetchedList = JSON.parse(sessionData);
					} catch (error) {
						startNotice("error", "Failed to fetch todo list. Please try again later.");
						if (process.env.ENVIRONMENT !== "production") console.error("Error parsing session data:", error);
						fetchedList = [];
					}
				} else fetchedList = [];
			} else fetchedList = await getToDoList(); // Get todo list from API

			setTodoList(fetchedList);
		} catch (error) {
			startNotice("error", "Failed to fetch todo list. Please try again later.");
			if (process.env.ENVIRONMENT !== "production") console.error(error);
		}
	}

	useEffect(() => {
		fetchTodoList();
		try {
			getUserInfo().then(setUserInfo);
		} catch (error) {
			startNotice("error", "Failed to fetch user information. Please try again later.");
			if (process.env.ENVIRONMENT !== "production" && error.request.status !== 404) console.error(error);
		}
	}, []);

	return (
		<main tabIndex={-1}>
			<div id="login-info" className={loggedIn ? "logged-in" : null}>
				{loggedIn ? (
					<>
						<img src={`${userInfo.picture}`} alt="Google profile picture" />
						<div id="profile-info">
							<a href="/auth/logout" className="signing" id="sign-in">
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
			<h1>Todo</h1>
			<Notice noticeInfo={noticeInfo} hideNotice={hideNotice} showNotice={showNotice} />
			<Confirmation
				confirmationInfo={confirmationInfo}
				hideConfirmation={hideConfirmation}
				showConfirmation={showConfirmation}
			/>
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				create={modalCreate}
				originalTodo={modalTodo}
				setModalTodo={setModalTodo}
				fetchTodoList={fetchTodoList}
				startNotice={startNotice}
				askConfirmation={askConfirmation}
			/>
			<TodoList
				setIsOpen={setIsOpen}
				setModalTodo={setModalTodo}
				todoList={todoList}
				createTodo={createTodo}
				setModalCreate={setModalCreate}
			/>
		</main>
	);
}

export default Main;
