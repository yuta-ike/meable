import Task from "src/data/model/domain/task/task";
import AppUser from "src/data/model/domain/user/appUser";
import AddTaskInput from "src/data/model/dto/addTaskInput";

export default interface TaskRepository {
	subscribe(appUser: AppUser | null, callback: (item: Task[]) => void, key?: string): void
	getAllTask(appUser: AppUser): Promise<Task[]>
	addTask(appUser: AppUser, task: AddTaskInput): Promise<string>
	gainPoint(appUser: AppUser, taskId: string, point: number): Promise<void>
}