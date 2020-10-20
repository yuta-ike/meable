import TaskDatasource from "src/data/repository/taskRepositry/interface/taskDatasource"
import Task from "src/data/model/domain/task/task"
import { DateTime } from "luxon"
import AddTaskInput from "src/data/model/dto/addTaskInput"
import TaskUnfoundException from "src/data/model/error/taskUnfoundException"
import UnauthenticatedException from "src/data/model/error/unauthenticatedException"

let id = 0
const getId = () => `${id++}`

type Callback = (tasks: Task[]) => void

export default class MockTaskDatasource implements TaskDatasource{
	_tasks: {[key: string]: Task[]} = {}
	_callbacks: { [key: string]: Callback[] } = {}

	subscribe(callback: Callback, key: string){
		if (this._callbacks[key] == null){
			this._callbacks[key] = [callback]
		}else{
			this._callbacks[key].push(callback)
		}
	}

	async getAllTasks(userId: string){
		return await Promise.resolve(this._tasks[userId])
	}

	async addTask(userId: string, taskInput: AddTaskInput){
		const task = new Task(getId(), taskInput.title, taskInput.body, taskInput.genre, DateTime.local(), DateTime.local())
		if(this._tasks[userId] == null){
			this._tasks[userId] = [task]
		}else{
			this._tasks[userId].push(task)
		}
		
		this._dispatch(userId)
		return Promise.resolve()
	}

	async gainPoint(userId: string, taskId: string, point: number){
		if(this._tasks[userId] == null) throw new UnauthenticatedException()
		const task = this._tasks[userId].find(task => task.id === taskId)
		if(task == null) throw new TaskUnfoundException()
		
		const pointLog = { point, gainedAt: DateTime.local() }
		task.gainPoint(pointLog)
		
		this._dispatch(userId)
	}

	_dispatch(userId: string){
		Object.values(this._callbacks).forEach(callbacks => callbacks.forEach(callback => callback(this._tasks[userId])))
	}
}
