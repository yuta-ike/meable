import React from 'react'
import Modal from 'react-modal'
import { useTaskUsecase } from 'src/Adapter/TaskProvider'
import Task from 'src/data/model/domain/task/task'
import useRouting from 'src/view/router/useRouting'

type Props = {
	isOpen: boolean,
	task: Task,
}

const TaskCompleteModal: React.FC<Props> = ({ isOpen, task }) => {
	const moveTo = useRouting()
	const taskUsecase = useTaskUsecase()


	const handleSubmit = async () => {
		await taskUsecase.gainPoint(task.id, 1)
		moveTo("/", { confirm: "point-gained" })()
	}

	const handleRequestClose = () => {
		moveTo("/")()
	}


	return (
		<Modal
			isOpen={isOpen}
			// onAfterOpen={this.afterOpenModal}
			onRequestClose={handleRequestClose}
			// style={customStyles}
			contentLabel="課題詳細"
			className="task-create-modal-component"
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
			<div className="task-complete-modal">
				<div className="task-complete-modal-title" role="heading">{task.title}</div>
				<div className="task-complete-description-label">せつめい</div>
				<div className="task-complete-modal-description">{task.body}</div>
				{/* <div className="task-point-wrapper">
					<div className="task-point">
						+1pt
					</div>
				</div> */}
				<div className="submit-button-wrapper">
					<div
						role="button"
						className="submit-button"
						onClick={() => handleSubmit()}
					>
						ポイントを かくとくする
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default TaskCompleteModal