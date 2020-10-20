import Task from "src/data/model/domain/task/task";
import AddTaskInput from "src/data/model/dto/addTaskInput";
import Subscribable from "src/utils/subscribe/subscribable";

export default interface TaskDatasource extends Subscribable<Task[]>{
	getAllTasks(userId: string): Promise<Task[]>
	addTask(userId: string, task: AddTaskInput): Promise<void>
	gainPoint(userId: string, taskId: string, point: number): Promise<void>
}