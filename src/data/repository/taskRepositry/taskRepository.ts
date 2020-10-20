import Task from "src/data/model/domain/task/task";
import AddTaskInput from "src/data/model/dto/addTaskInput";
import ITaskRepository from "src/usecase/interface/taskRepository";
import TaskDatasource from "./interface/taskDatasource";

export default class TaskRepository implements ITaskRepository{
	constructor(readonly datasource: TaskDatasource){
	}

	subscribe(callback: (tasks: Task[]) => void, key?: string){
		this.datasource.subscribe(callback, key)
	}

	getAllTask(userId: string){
		return this.datasource.getAllTasks(userId)
	}

	addTask(userId: string, taskInput: AddTaskInput){
		return this.datasource.addTask(userId, taskInput)
	}

	gainPoint(userId: string, taskId: string, point: number){
		return this.datasource.gainPoint(userId, taskId, point)
	}
}