import React from 'react'
import { useTasks } from 'src/Adapter/TaskProvider'
import { useHistory } from "react-router-dom"

const Home: React.FC<{}> = () => {
	const tasks = useTasks()
	const history = useHistory()

	const handleMove = () => {
		history.push("/task/create")
	}

	const handleGainPoint = (taskId: string) => {
		history.push(`/task/${taskId}`)
	}

	return (
		<div>
			<button onClick={handleMove}>タスクを追加する</button>
			{
				tasks.map((task) => (
					<div key={task.id}>
						{task.title}: {task.body} （ポイント: {task.point}）
						<button onClick={() => handleGainPoint(task.id)}>ポイントを獲得する</button>
					</div>
				))
			}
		</div>
	)
}

export default Home
