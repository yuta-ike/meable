import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTasks } from 'src/Adapter/TaskProvider'
import { useAppUser, useUserUsecase } from 'src/Adapter/UserProvider'
import useRouting from 'src/view/router/useRouting'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { IoMdQrScanner } from 'react-icons/io'
import TaskCreateModal from 'src/view/modal/TaskCreate/TaskCreate'
import TaskCompleteModal from 'src/view/modal/TaskComplete/TaskComplete'
import TaskDetail from 'src/view/modal/TaskDetail/TaskDetail'
import queryString from 'query-string'
import TaskHistory from 'src/view/modal/TaskHistory/TaskHistory'

Modal.setAppElement('#root')

export type ConfirmDialogType = "point-gained" | "task-created"

type Prop = {
	taskId?: string,
	showCreateDialog?: boolean,
	showCompleteDialog?: boolean,
	showTaskDialog?: boolean,
	showHistoryDialog?: boolean,
}

const Home: React.FC<Prop> = ({ taskId, showTaskDialog = false, showCreateDialog = false, showCompleteDialog = false, showHistoryDialog = false }) => {
	const location = useLocation()
	const moveTo = useRouting()
	const tasks = [...useTasks()].reverse()
	const userUsecase = useUserUsecase()
	const appUser = useAppUser()
	const [logoutModalOpen, setLogoutModalOpen] = useState(false)

	const task = tasks.find(task => task.id === taskId)

	
	const handleLogout = async () => {
		await userUsecase.logout()
	}

	if (taskId != null && task == null) return null

	const modalType = queryString.parse(location.search).modaltype as ConfirmDialogType | null

	return (
		<div className="home-page" role="main">
			<div className="point-area" onClick={moveTo("/history", { delay: true })}>
				<div className="point-label" aria-label="point-data">
					POINT
				</div>
				<div id="point-data" className="point-data">
					{tasks.reduce((acc, task) => acc + task.point, 0)}
				</div>
			</div>
			<div className="task-list" role="list">
				{
					tasks.map((task) => (
						<div key={task.id} className="task-item" onClick={moveTo(`/task/${task.id}`, { delay: true })}>
							<div className="task-title" role="heading">{task.title}</div>
							<div className="task-point"><span className="task-point-prefix">いま</span><br/>{task.point}<span className="task-point-unit">pt</span></div>
						</div>
					))
				}
				{
					tasks.length === 0 &&
					<p>タスクは まだ とうろくされて いません</p>
				}
			</div>
			<nav className="bottom-bar">
				<div className="bottom-bar-button" onClick={() => setLogoutModalOpen(true)}>
					<BiLogOut/>
				</div>
				<div className="bottom-bar-button center-button-outer">
					<div className="center-button" onClick={moveTo("/task/create", { delay: true })} role="button">
						<FaPlus/>
					</div>
				</div>
				<div className="bottom-bar-button" onClick={moveTo("/scanner")}>
					<IoMdQrScanner />
				</div>
			</nav>
			
			{
				task != null &&
				<TaskDetail
					isOpen={showTaskDialog}
					task={task}
				/>
			}

			<TaskCreateModal
				isOpen={showCreateDialog}
			/>

			{task != null && <TaskCompleteModal isOpen={showCompleteDialog} task={task}/>}

			<TaskHistory isOpen={showHistoryDialog}/>

			<Modal
				isOpen={modalType != null}
				onRequestClose={moveTo("/")}
				contentLabel="確認"
				className="task-modal-component"
				style={{
					content: {
						position: "absolute",
						minWidth: "300px",
						bottom: "auto",
						top: "50%",
						left: "50%",
						margin: "auto 0",
						transform: "translate(-50%, -55%)",
						borderRadius: "40px",
					}
				}}
			>
				<div className="task-modal">
					<div className="task-title" role="heading">
						{
							modalType === "point-gained" ? "ポイントをゲット！" :
							modalType === "task-created" ? "ついか かんりょう！" : ""
						}
					</div>
					<div className="close-button-wrapper">
						<div className="close-button" role="button" onClick={moveTo("/", { delay: true })}>OK</div>
					</div>
				</div>
			</Modal>

			<Modal
				isOpen={logoutModalOpen}
				onRequestClose={() => setLogoutModalOpen(false)}
				contentLabel="ログアウト確認"
				className="task-modal-component"
				style={{
					content: {
						position: "absolute",
						minWidth: "300px",
						bottom: "auto",
						top: "50%",
						left: "50%",
						margin: "auto 0",
						transform: "translate(-50%, -55%)",
						borderRadius: "40px",
					}
				}}
			>
				<div className="task-modal">
					<div className="task-title" role="heading">
						ログアウトしますか？
					</div>
					<div className="logout-button-wrapper">
						<div className="cancel-button" role="button" onClick={() => setLogoutModalOpen(false)}>　しない　</div>
						<div className="logout-button" role="button" onClick={handleLogout}>ログアウトする</div>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default Home
