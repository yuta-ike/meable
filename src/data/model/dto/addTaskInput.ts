import { Genre } from "src/data/model/types/genre"

type AddTaskInput = {
	readonly title: string,
	readonly body: string,
	readonly genre: Genre,
}

export default AddTaskInput

