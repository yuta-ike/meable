import Task from "src/data/model/domain/task/task";
import AddTaskInput from "src/data/model/dto/addTaskInput";
import TaskUnfoundException from "src/data/model/error/taskUnfoundException";
import UnauthenticatedException from "src/data/model/error/unauthenticatedException";
import TaskUsecase from "src/usecase/taskUsecase";
import TaskRepository from "../usecase/interface/taskRepository";
import UserRepository from "../usecase/interface/userRepository";

type SinkFunction = (tasks: Task[]) => void

export default class TaskInteractor implements TaskUsecase{
	constructor(readonly taskRepository: TaskRepository, readonly userRepository: UserRepository){}
	
	private tasks: Task[] = []

	subscribe(callback: SinkFunction, key?: string){
		this.userRepository.subscribe((appUser) => {
			if(appUser != null && appUser.schoolId !== ""){
				this.taskRepository.subscribe(appUser, (tasks) => {
					callback(tasks)
					this.tasks = tasks
				}, key)
			}
		})
	}

	async getAllTask(){
		// const appUser = this.userRepository.appUser
		// if (appUser == null) throw new UnauthenticatedException()
		// return await this.taskRepository.getAllTask(appUser)
		return this.tasks
	}

	getTaskLog(){
		const taskLogs = this.tasks.map((task) => task.pointHistory.map((pointLog) => ({task, ...pointLog}))).flat()
		taskLogs.sort((a, b) => {
			if (a.gainedAt == null || b.gainedAt == null) {
				return 0
			} else {
				return a.gainedAt > b.gainedAt ? 1 : a.gainedAt < b.gainedAt ? -1 : 0
			}
		})
		return taskLogs
	}

	async getTask(taskId: string){
		const tasks = await this.getAllTask()
		const task = tasks.find(task => task.id === taskId)
		if(task == null) throw new TaskUnfoundException()
		return task
	}

	async addTask(taskInput: AddTaskInput){
		const appUser = this.userRepository.appUser
		if (appUser == null) throw new UnauthenticatedException()
		return await this.taskRepository.addTask(appUser, taskInput)
	}

	async gainPoint(taskId: string, point: number){
		const appUser = this.userRepository.appUser
		if (appUser == null) throw new UnauthenticatedException()
		await this.taskRepository.gainPoint(appUser, taskId, point)
	}
}