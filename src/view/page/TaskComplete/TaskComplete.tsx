import React from 'react'
import { useParams } from 'react-router-dom'
import { useTasks, useTaskUsecase } from 'src/Adapter/TaskProvider'
import useAsync from 'src/utils/asyncState'
import useRouting from 'src/view/router/useRouting'

const TaskComplete: React.FC = () => {
	const moveTo = useRouting()
	const { taskId } = useParams<{taskId: string}>()
	const taskUsecase = useTaskUsecase()
	const tasks = useTasks()
	const task = tasks.find(task => task.id === taskId)

	const handleGainPoint = async () => {
		taskUsecase.gainPoint(taskId, 2)
		moveTo("/")()
	}

	if(task == null){
		return (
			<div>
				タスクがみつかりませんでした
			</div>
		)
	}
	
	return (
		<div>
			<div>{task.title}</div>
			<button onClick={handleGainPoint}>1ポイント獲得する</button>
		</div>
	)
}

export default TaskComplete
