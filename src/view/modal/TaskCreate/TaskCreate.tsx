import React, { useState } from 'react'
import Modal from 'react-modal'
import { useTaskUsecase } from 'src/Adapter/TaskProvider'
import { Genre } from 'src/data/model/types/genre'
import useRouting from 'src/view/router/useRouting'
import getGenre from '../genre/sdgs'
type Props = {
	isOpen: boolean,
}


const TaskCreateModal: React.FC<Props> = ({ isOpen }) => {
	const moveTo = useRouting()
	const taskUsecase = useTaskUsecase()
	
	const [page, setPage] = useState(0)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [genre, setGenre] = useState<Genre | null>(null)

	const handleSelectGenre = (genre: number) => {
		if(1 <= genre && genre <= 17){
			setGenre(genre as Genre)
			setPage(0)
		}
	}
	
	const isValid = title !== "" && title.length <= 25 && description !== "" && description.length <= 100 && genre != null && 1 <= genre && genre <= 17
	
	const handleSubmit = async () => {
		if(isValid && genre != null){
			await taskUsecase.addTask({title, body: description, genre })
			setTimeout(() => {
				moveTo("/", { confirm: "task-created" })()
				setTitle("")
				setDescription("")
				setGenre(null)
			}, 300)
		}
	}

	const handleRequestClose = () => {
		setPage(0)
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
			{
				page === 0 ? (
					<div className="task-create-modal">
						<div className="task-modal-title" role="heading">あたらしいタスク</div>
						<label htmlFor="task-create-title-label">タスクのなまえ</label>
						<input type="text" id="task-create-title" className="task-create-title" value={title} onChange={e => setTitle(e.target.value)}/>
						<label htmlFor="task-create-description-modal">タスクのせつめい</label>
						<textarea className="task-create-description" id="task-create-description" rows={3} value={description} onChange={e => setDescription(e.target.value)}/>
						<label>SDGsを えらぼう</label>
						{genre != null && <div className="selected-genre">{genre}. {getGenre(genre).text}</div>}
						<div className="icon-wrapper">
							{
								genre != null ? (
									<img
										className="icon"
										src={`/img/sdg_icon_${`${genre}`.padStart(2, "0")}_ja_2.png`}
										alt={`SDGs ${genre}のアイコン`}
										onClick={() => setTimeout(() => setPage(1), 300)}
										role="button"
									/>
								) : (
									<div className="icon" onClick={() => setTimeout(() => setPage(1), 300)} role="button"/>
								)
							}
						</div>
						<div className="submit-button-wrapper">
							<div
								role="button"
								className={"submit-button" + (isValid ? "" : " submit-button-disabled")}
								onClick={handleSubmit}
								aria-disabled={!isValid}
							>
								決定
							</div>
						</div>
					</div>
				) : (
					<div className="task-create-modal">
						<div className="task-modal-title" role="heading">あたらしいタスク</div>
						<label className="task-genre-label">SDGsを えらんで ください</label>
						<div className="icon-list">
							{
								Array(17).fill(null).map((_, i) => i + 1).map((i) => (
									<img
										key={i}
										className="icon"
										src={`/img/sdg_icon_${`${i}`.padStart(2, "0")}_ja_2.png`}
										alt={`SDGs ${i}のアイコン`}
										onClick={() => setTimeout(() => handleSelectGenre(i), 300)}
									/>
								))
							}
						</div>
					</div>
				)
			}
		</Modal>
	)
}

export default TaskCreateModal