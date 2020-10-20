import MockTaskDatasource from "src/data/datasource/taskDatasource/test/mockTaskDatasource"
import MockUserDatasource from "src/data/datasource/userDatasource/test/mockUserDatasource"
import ITaskDatasource from "src/data/repository/taskRepositry/interface/taskDatasource"
import TaskRepository from "src/data/repository/taskRepositry/taskRepository"
import UserRepository from "src/data/repository/userRepository/userRepository"
import ITaskRepository from "src/usecase/interface/taskRepository"
import TaskUsecase from "src/usecase/taskUsecase"
import TaskInteractor from "src/interactor/taskInteractor";
import UserUsecase from "src/usecase/userUsecase"
import UserInteractor from "src/interactor/appUserInteractor"

const taskDatasource: ITaskDatasource = new MockTaskDatasource()
const taskRepository: ITaskRepository = new TaskRepository(taskDatasource)
const userDatasource = new MockUserDatasource()
const userRepository = new UserRepository(userDatasource)
const taskUsecase: TaskUsecase = new TaskInteractor(taskRepository, userRepository)
const userUsecase: UserUsecase = new UserInteractor(userRepository)

const getTaskUsecase = () => taskUsecase
const getUserUsecase = () => userUsecase

export { getTaskUsecase, getUserUsecase }