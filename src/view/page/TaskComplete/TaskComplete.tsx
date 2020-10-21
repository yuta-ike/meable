import React from 'react'
import { useParams } from 'react-router-dom'
import { useTaskUsecase } from 'src/Adapter/TaskProvider'
import { useHistory } from 'react-router-dom'
import useAsync from 'src/utils/asyncState'

const TaskComplete: React.FC = () => {
	const { taskId } = useParams<{taskId: string}>()
	const taskUsecase = useTaskUsecase()
	const history = useHistory()

	const task = useAsync(() => taskUsecase.getTask(taskId))

	const handleGainPoint = () => {
		taskUsecase.gainPoint(taskId, 1)
		history.push("/")
	}

	return (
		<div>
			{
				task.isSuccess() && (
					<div>{task.data.title}</div>
				)
			}
			<button onClick={handleGainPoint}>1ポイント獲得する</button>
		</div>
	)
}

export default TaskComplete
