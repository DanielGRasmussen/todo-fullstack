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
	const [isOpen, setIsOpen] = useState(false); 	// Modal isOpen
	const [modalTodo, setModalTodo] = useState({});
	const [modalCreate, setModalCreate] = useState(false);
	const [userInfo, setUserInfo] = useState<IUserInfo>(JSON.parse(sessionStorage.getItem("userInfo") ||
		"{ \"googleId\": \"\", \"_id\": \"\", \"name\": \"\", \"email\": \"\", \"picture\": \"/assets/default-profile-picture.svg\" }"
	));
	const [showNotice, setShowNotice] = useState(false);
	const [noticeInfo, setNoticeInfo] = useState({ type: "", message: "" });
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [confirmationInfo, setConfirmationInfo] = useState({
		message: "",
		// Typing stuffs
		next: function () {
			return 1 + 2;
		}
	});
	const loggedIn = userInfo.googleId !== "";

	function startNotice(noticeType: string, noticeMessage: string): void {
		setNoticeInfo({ type: noticeType, message: noticeMessage });
		setShowNotice(true);
		setTimeout(() => hideNotice(), 2000);
	}

	function hideNotice() {
		const notice = document.getElementById("notice");
		if (notice) {
			notice.classList.add("close");
			sleep(500).then(() => {
				setShowNotice(false);
			});
		}
	}

	function askConfirmation(noticeMessage: string, confirmationNext) {
		setConfirmationInfo({
			message: noticeMessage,
			next: confirmationNext
		});
		setShowConfirmation(true);
	}

	function hideConfirmation() {
		const confirmationOverlay = document.getElementById("confirmation-overlay");
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

	async function fetchTodoList(): Promise<void> {
		try {
			const fetchedList: ITodoData[] = await getToDoList();
			setTodoList(fetchedList);
		} catch (error) {
			if (error.response.status === 404) startNotice("error", "Something went wrong...");
			else {
				console.error(error);
				startNotice("error", error.message);
			}
		}
	}
	try {
	useEffect(() => {
		fetchTodoList();
		try {
			getUserInfo().then(setUserInfo);
		} catch (error) {
			if (error.response.status === 404) startNotice("error", "Something went wrong...");
			else {
				console.log(error);
				startNotice("error", error.message);
			}
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
	} catch (error) {
		if (error.response.status === 404) startNotice("error", "Something went wrong...");
		else {
			console.error(error);
			startNotice("error", error.message);
		}
	}
}

export default Main;
