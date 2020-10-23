import React from 'react'
import Modal from 'react-modal'
import Task from 'src/data/model/domain/task/task'
import useRouting from 'src/view/router/useRouting'

type Props = {
	isOpen: boolean,
	task: Task,
}

const TaskDetail: React.FC<Props> = ({ isOpen, task }) => {
	const moveTo = useRouting()

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={moveTo("/")}
			contentLabel="課題詳細"
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
				<div className="task-title" role="heading">{task.title}</div>
				<div className="task-point"><span className="task-point-prefix">いま</span><br />{task.point}<span className="task-point-unit">pt</span></div>
				<div className="task-body">
					<div className="task-description-label">せつめい</div>
					<div className="task-description">
						{task.body}
					</div>
				</div>
				<div className="modal-actions">
					<div className="icon-wrapper">
						<label className="icon-label" htmlFor="sdgs-icon">SDGs</label>
						<img
							id="sdgs-icon"
							className="icon"
							src={`/img/sdg_icon_${`${task.genre}`.padStart(2, "0")}_ja_2.png`}
							alt={`SDGs ${task.genre}のアイコン`}
						/>
					</div>
					<div className="print-button-wrapper">
						<label className="print-button-label">ステッカー</label>
						<div className="print-button" role="button" onClick={moveTo(`/task/${task.id}/qr`, { delay: true })}>
							ステッカーを<br />いんさつする
						</div>
					</div>
				</div>
				<div className="close-button-wrapper">
					<div className="close-button" role="button" onClick={moveTo("/", { delay: true })}>もどる</div>
				</div>
			</div>
		</Modal>
	)
}

export default TaskDetail