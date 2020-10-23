import { DateTime } from "luxon"
import Task from "./task"

type PointLog = {
	point: number,
	gainedAt: DateTime,
}

export type TaskLog = {
	point: number,
	gainedAt: DateTime,
	task: Task
}

export default PointLog