import React, { useState } from 'react'
import { useTaskUsecase } from 'src/Adapter/TaskProvider'
import { useHistory } from "react-router-dom"

const TaskCreate: React.FC<{}> = () => {
	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")
	const taskUsecase = useTaskUsecase()

	const handleCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		taskUsecase.addTask({ title, body, genre: 1 })
		setTitle("")
		setBody("")
	}

	const history = useHistory()
	const handleMove = () => {
		history.push("/")
	}

	return (
		<>
			<button onClick={handleMove}>一覧へ戻る</button>
			<form>
				<input type="text" value={title} onChange={e => setTitle(e.target.value)} />
				<input type="text" value={body} onChange={e => setBody(e.target.value)}/>
				<button onClick={handleCreate}>送信</button>
			</form>
		</>
	)
}

export default TaskCreate
