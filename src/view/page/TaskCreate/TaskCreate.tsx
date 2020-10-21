import React, { useState } from 'react'
import { useTaskUsecase } from 'src/Adapter/TaskProvider'
import { useHistory } from "react-router-dom"
import QRCode from 'qrcode.react'
import { Genre } from 'src/data/model/types/genre'

const TaskCreate: React.FC<{}> = () => {
	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")
	const [genre, setGenre] = useState("")
	const taskUsecase = useTaskUsecase()
	const [taskId, setTaskId] = useState("")

	const isValid = title.length > 0 && Number.isInteger(parseInt(genre)) && 1 <= parseInt(genre) && parseInt(genre) <= 17

	const handleCreate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		const taskId = await taskUsecase.addTask({ title, body, genre: parseInt(genre) as Genre })
		setTaskId(taskId)
		setTitle("")
		setBody("")
		setGenre("")
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
				<input type="text" value={body} onChange={e => setBody(e.target.value)} />
				<input type="number" value={genre} onChange={e => setGenre(e.target.value)} />
				<button onClick={handleCreate} disabled={!isValid}>送信</button>
			</form>
			{
				taskId !== "" &&
				<QRCode value={`${window.location.origin}/task/${taskId}`}/>
			}
		</>
	)
}

export default TaskCreate
