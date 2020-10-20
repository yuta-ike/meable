import { DateTime } from "luxon"
import { Genre } from "src/data/model/types/genre"
import PointLog from "./pointLog";

export default class Task{
	constructor(
		readonly id: string,
		readonly title: string,
		readonly body: string,
		readonly genre: Genre,
		readonly createdAt: DateTime,
		readonly updatedAt: DateTime,
		pointHistory?: PointLog[]
	){
		if(pointHistory != null){
			this.pointHistory = pointHistory
		}
	}

	readonly pointHistory: PointLog[] = []

	get point(){
		return this.pointHistory.length
	}

	gainPoint(pointLog: PointLog){
		this.pointHistory.push(pointLog)
	}
}