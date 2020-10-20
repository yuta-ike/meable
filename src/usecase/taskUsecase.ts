import Task from "src/data/model/domain/task/task";
import AddTaskInput from "src/data/model/dto/addTaskInput"
import Subscribable from "src/utils/subscribe/subscribable";

export default interface TaskUseCase extends Subscribable<Task[]>{
	getAllTask(): Promise<Task[]>
	addTask(taskInput: AddTaskInput): Promise<void>
	gainPoint(taskId: string, point: number): Promise<void>
}