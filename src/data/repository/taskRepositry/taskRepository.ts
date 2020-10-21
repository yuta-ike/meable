import Task from "src/data/model/domain/task/task";
import AppUser from "src/data/model/domain/user/appUser";
import AddTaskInput from "src/data/model/dto/addTaskInput";
import ITaskRepository from "src/usecase/interface/taskRepository";
import TaskDatasource from "./interface/taskDatasource";

export default class TaskRepository implements ITaskRepository{
	constructor(readonly datasource: TaskDatasource){
	}

	subscribe(appUser: AppUser, callback: (tasks: Task[]) => void, key?: string){
		this.datasource.subscribe(appUser, callback, key)
	}

	getAllTask(appUser: AppUser){
		return this.datasource.getAllTasks(appUser)
	}

	addTask(appUser: AppUser, taskInput: AddTaskInput){
		return this.datasource.addTask(appUser, taskInput)
	}

	gainPoint(appUser: AppUser, taskId: string, point: number){
		return this.datasource.gainPoint(appUser, taskId, point)
	}
}