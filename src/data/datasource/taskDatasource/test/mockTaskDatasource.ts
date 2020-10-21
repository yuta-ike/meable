import TaskDatasource from "src/data/repository/taskRepositry/interface/taskDatasource"
import Task from "src/data/model/domain/task/task"
import { DateTime } from "luxon"
import AddTaskInput from "src/data/model/dto/addTaskInput"
import TaskUnfoundException from "src/data/model/error/taskUnfoundException"
import UnauthenticatedException from "src/data/model/error/unauthenticatedException"
import AppUser from "src/data/model/domain/user/appUser"

let id = 0
const getId = () => `${id++}`

type Callback = (tasks: Task[]) => void

export default class MockTaskDatasource implements TaskDatasource{
	_tasks: Record<string, Task[]> = {}
	_callbacks: Record<string, Callback[]> = {}

	subscribe(appUser: AppUser | null, callback: Callback, key: string){
		if (this._callbacks[key] == null){
			this._callbacks[key] = [callback]
		}else{
			this._callbacks[key].push(callback)
		}
	}

	async getAllTasks(appUser: AppUser){
		return await Promise.resolve(this._tasks[appUser.userId])
	}

	async addTask(appUser: AppUser, taskInput: AddTaskInput){
		const id = getId()
		const task = new Task(id, taskInput.title, taskInput.body, taskInput.genre, DateTime.local(), DateTime.local())
		if (this._tasks[appUser.userId] == null){
			this._tasks[appUser.userId] = [task]
		}else{
			this._tasks[appUser.userId].push(task)
		}
		
		this._dispatch(appUser.userId)
		return Promise.resolve(id)
	}

	async gainPoint(appUser: AppUser, taskId: string, point: number){
		if (this._tasks[appUser.userId] == null) throw new UnauthenticatedException()
		const task = this._tasks[appUser.userId].find(task => task.id === taskId)
		if(task == null) throw new TaskUnfoundException()
		
		const pointLog = { point, gainedAt: DateTime.local() }
		task.gainPoint(pointLog)
		
		this._dispatch(appUser.userId)
	}

	_dispatch(userId: string){
		Object.values(this._callbacks).forEach(callbacks => callbacks.forEach(callback => callback(this._tasks[userId])))
	}
}
