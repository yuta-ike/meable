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
	
	subscribe(callback: SinkFunction, key?: string){
		this.taskRepository.subscribe(callback, key)
	}

	async getAllTask(){
		const userId = this.userRepository.appUser?.userId
		if (userId == null) throw new UnauthenticatedException()
		return await this.taskRepository.getAllTask(userId)
	}

	async getTask(taskId: string){
		const tasks = await this.getAllTask()
		const task = tasks.find(task => task.id === taskId)
		if(task == null) throw new TaskUnfoundException()
		return task
	}

	async addTask(taskInput: AddTaskInput){
		const userId = this.userRepository.appUser?.userId
		if (userId == null) throw new UnauthenticatedException()
		await this.taskRepository.addTask(userId, taskInput)
	}

	async gainPoint(taskId: string, point: number){
		const userId = this.userRepository.appUser?.userId
		if (userId == null) throw new UnauthenticatedException()
		await this.taskRepository.gainPoint(userId, taskId, point)
	}
}