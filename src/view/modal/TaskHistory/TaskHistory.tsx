import React, { useState } from 'react'
import Modal from 'react-modal'
import { useTaskUsecase } from 'src/Adapter/TaskProvider'
import { Genre } from 'src/data/model/types/genre'
import useRouting from 'src/view/router/useRouting'
import getGenre from '../genre/sdgs'

type Props = {
	isOpen: boolean,
}


const TaskHistory: React.FC<Props> = ({ isOpen }) => {
	const moveTo = useRouting()
	const taskUsecase = useTaskUsecase()
	const taskLogs = [...taskUsecase.getTaskLog()].reverse()
	
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={moveTo("/")}
			contentLabel="ポイント履歴"
			className="task-history-modal-component"
			closeTimeoutMS={2000}
			style={{
				content: {
					position: "absolute",
					top: "auto",
					bottom: 0,
					borderRadius: "40px 40px 0 0",
					transform: "none",
					margin: "auto 0",
					marginBottom: 0,
					width: "100vw",
				}
			}}
		>
			<div className="task-history-modal">
				<div className="task-history-title" role="heading">ポイント りれき</div>
				<div role="list" className="task-history-list">
					{
						taskLogs.map((taskLog) => (
							<div className="log-item" key={taskLog.gainedAt.toString()}>
								<div className="log-left-wrapper">
									<div className="log-title">
										{taskLog.task.title}
									</div>
									<p className="log-date">
										{taskLog.gainedAt.toFormat("yyyyねん MMがつ ddにち HH:mm")}
									</p>
								</div>
								<div className="log-point-wrapper">
									<div className="log-point">+1</div>
								</div>
							</div>
						))
					}
					{
						taskLogs.length === 0 &&
						<p>りれきは ありません</p>
					}
				</div>
				<div className="submit-button-wrapper">
					<div
						role="button"
						className="submit-button"
						onClick={moveTo("/", { delay: true })}
					>
						もどる
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default TaskHistory