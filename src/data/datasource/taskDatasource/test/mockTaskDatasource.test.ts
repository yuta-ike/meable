import generateTask from "src/data/model/domain/task/faker/taskFaker"
import TaskDatasource from "../../../repository/taskRepositry/interface/taskDatasource"
import MockTaskDatasource from "./mockTaskDatasource"

describe("mockTaskDatasourceのテスト", () => {
	const userId = "userid2"
	const taskDatasource: TaskDatasource = new MockTaskDatasource()

	test("ミッションの追加と取得", async () => {
		// const task = generateTask()
		// await taskDatasource.addTask(userId, task)
		// const tasks = await taskDatasource.getAllTasks(userId)
		// expect(tasks).toEqual(expect.arrayContaining([task]))
	})
})