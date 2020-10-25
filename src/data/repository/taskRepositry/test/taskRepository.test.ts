import MockTaskDatasource from "src/data/datasource/taskDatasource/test/mockTaskDatasource"
import TaskRepository from "../taskRepository"
import ITaskRepository from "src/usecase/interface/taskRepository"
import generateTask from "src/data/model/domain/task/faker/taskFaker"

describe("TaskRepository", () => {
	const taskDatasource = new MockTaskDatasource()
	const userId1 = "userid1"
	const userId2 = "userid2"
	const task1 = generateTask("1")
	const task2 = generateTask("2")

	test("ミッションの追加と取得", async () => {
		// const taskRepository: ITaskRepository = new TaskRepository(taskDatasource)
		
		// await taskRepository.addTask(userId1, task1)
		// await taskRepository.addTask(userId1, task2)
		// const tasks = await taskRepository.getAllTask(userId1)

		// expect(tasks).toEqual(expect.arrayContaining([task1, task2]))
	})

	test("ミッションの追加と取得2", async () => {
		// const taskRepository: ITaskRepository = new TaskRepository(taskDatasource)

		// await taskRepository.addTask(userId2, task1)
		// await taskRepository.addTask(userId2, task2)
		// const tasks = await taskRepository.getAllTask(userId2)

		// expect(tasks).toEqual(expect.arrayContaining([task1, task2]))
	})
})