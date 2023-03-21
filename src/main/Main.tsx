import "./css/Main.css";
import React, { useCallback, useEffect, useState } from "react";
import { ITodoData, TodoList } from "./TodoList";
import { Modal } from "../modal/Modal";
import { getToDoList } from "../ExternalServices";
import Notice from "./Notice";
import { sleep } from "../utils";
import Confirmation from "./Confirmation";

function Main(): JSX.Element {
	const [todoList, setTodoList] = useState<ITodoData[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [modalTodo, setModalTodo] = useState({});
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

	function startNotice() {
		useCallback((noticeType: string, noticeMessage: string) => {
			setNoticeInfo({ type: noticeType, message: noticeMessage });
			setShowNotice(true);
			setTimeout(() => hideNotice(), 2000);
		}, []);
	}

	function hideNotice() {
		useCallback(function () {
			const notice = document.getElementById("notice");
			if (notice) {
				notice.classList.add("close");
				sleep(500).then(() => {
					setShowNotice(false);
				});
			}
		}, []);
	}

	function askConfirmation(noticeMessage: string, confirmationNext) {
		setConfirmationInfo({
			message: noticeMessage,
			next: confirmationNext
		});
		setShowConfirmation(true);
	}

	function hideConfirmation() {
		const confirmationOverlay = document.getElementById(
			"confirmation-overlay"
		);
		if (confirmationOverlay) {
			confirmationOverlay.classList.add("close");
			sleep(190).then(() => {
				setShowConfirmation(false);
			});
		}
	}

	async function fetchTodoList(): Promise<void> {
		const fetchedList: ITodoData[] = await getToDoList();
		setTodoList(fetchedList);
	}

	useEffect(() => {
		fetchTodoList();
	}, []);

	return (
		<main tabIndex={-1}>
			<h1>To-Do</h1>
			<Notice
				noticeInfo={noticeInfo}
				hideNotice={hideNotice}
				showNotice={showNotice}
			/>
			<Confirmation
				confirmationInfo={confirmationInfo}
				hideConfirmation={hideConfirmation}
				showConfirmation={showConfirmation}
			/>
			{Modal(
				isOpen,
				setIsOpen,
				modalTodo,
				setModalTodo,
				fetchTodoList,
				startNotice,
				askConfirmation
			)}
			{TodoList(setIsOpen, setModalTodo, todoList)}
		</main>
	);
}

export default Main;
