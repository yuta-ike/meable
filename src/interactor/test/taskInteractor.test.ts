import MockTaskDatasource from "src/data/datasource/taskDatasource/test/mockTaskDatasource"
import MockUserDatasource from "src/data/datasource/userDatasource/test/mockUserDatasource"
import AddTaskInput from "src/data/model/dto/addTaskInput"
import TaskUnfoundException from "src/data/model/error/taskUnfoundException"
import UnauthenticatedException from "src/data/model/error/unauthenticatedException"
import ITaskDatasource from "src/data/repository/taskRepositry/interface/taskDatasource"
import TaskRepository from "src/data/repository/taskRepositry/taskRepository"
import UserRepository from "src/data/repository/userRepository/userRepository"
import ITaskRepository from "src/usecase/interface/taskRepository"
import TaskUseCase from "src/usecase/taskUsecase"
import TaskInteractor from "../taskInteractor"

describe("taskInteractor", () => {
	const taskDatasource: ITaskDatasource = new MockTaskDatasource()
	const taskRepository: ITaskRepository = new TaskRepository(taskDatasource)
	const userDatasource = new MockUserDatasource()
	const userRepository = new UserRepository(userDatasource)
	const taskUsecase: TaskUseCase = new TaskInteractor(taskRepository, userRepository)
	const taskInput: AddTaskInput = { title: "課題1", body: "課題1の説明", genre: 1 }

	test("ログイン前は課題の追加・確認・ポイント追加ができない", async () => {
		expect(taskUsecase.addTask(taskInput)).rejects.toThrow(UnauthenticatedException)
		expect(taskUsecase.getAllTask()).rejects.toThrow(UnauthenticatedException)
		expect(taskUsecase.gainPoint("0", 2)).rejects.toThrow(UnauthenticatedException)
	})

	test("タスクの追加と確認ができる", async () => {
		await userRepository.login()
		await taskUsecase.addTask(taskInput)
		const tasks = await taskUsecase.getAllTask()
		expect(
			tasks.some(task => task.body === taskInput.body && task.title === taskInput.title && task.genre === taskInput.genre)
		).toBeTruthy()
	})

	test("タスクにポイントを追加できる", async () => {
		const point = 3
		const tasks = await taskUsecase.getAllTask()
		const task = tasks[0]
		taskUsecase.gainPoint(task.id, point)
		const newTasks = await taskUsecase.getAllTask()
		const newTask = newTasks.find(_task => _task.id == task.id)
		expect(newTask?.point).toBe(1)
		expect(newTask?.pointHistory[0].point).toBe(point)
	})

	test("タスクの変更を購読できる", async () => {
		const taskInput2: AddTaskInput = { title: "課題2", body: "課題2の説明", genre: 2 }
		const promise = new Promise((resolve, _) => {
			taskUsecase.subscribe((tasks) => {
				resolve(tasks[1].title)
			})
		})
		taskUsecase.addTask(taskInput2)
		expect(
			promise
		).resolves.toBe(taskInput2.title)
	})

	test("存在しないタスクにはポイントを追加できない", async () => {
		expect(taskUsecase.gainPoint("ABCDEFGHIJ", 1)).rejects.toThrow(TaskUnfoundException)
	})

	test("ログアウトすると課題の追加・確認・ポイント追加ができない", async () => {
		await userRepository.logout()
		expect(taskUsecase.addTask(taskInput)).rejects.toThrow(UnauthenticatedException)
		expect(taskUsecase.getAllTask()).rejects.toThrow(UnauthenticatedException)
		expect(taskUsecase.gainPoint("0", 2)).rejects.toThrow(UnauthenticatedException)
	})
})