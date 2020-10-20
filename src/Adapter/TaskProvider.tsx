import React, { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import Task from "src/data/model/domain/task/task"
import TaskUsecase from "src/usecase/taskUsecase"
import { getTaskUsecase } from "./initialize"

const taskUsecaseInit = getTaskUsecase()
const TaskContex = createContext<TaskUsecase>(taskUsecaseInit)
const TaskContextProvider = TaskContex.Provider

const taskDataInit: Task[] = []
const TaskDataContex = createContext<Task[]>(taskDataInit)
const TaskDataContextProvider = TaskDataContex.Provider

const TaskProvider: React.FC<{}> = ({ children }) => {
	const [taskUsecase] = useState<TaskUsecase>(taskUsecaseInit)
	const [tasks, setTasks] = useState<Task[]>(taskDataInit)
	
	useEffect(() => {
		taskUsecase.subscribe((tasks) => {
			setTasks(tasks)
		}, "taskprovider")
		// TODO: Unsubscribeの実装
		// return taskUsecase.unsubscribe("taskprovider")
	}, [taskUsecase])

	return (
		<TaskContextProvider value={taskUsecase}>
			<TaskDataContextProvider value={tasks}>
				{ children }
			</TaskDataContextProvider>
		</TaskContextProvider>
	)
}

const useTaskUsecase = () => useContext(TaskContex)
const useTasks = () => {
	const tasks = useContext(TaskDataContex)
	return tasks as readonly Task[]
}

export default TaskProvider
export { useTaskUsecase, useTasks }