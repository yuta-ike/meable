import { DateTime } from "luxon"
import { Genre } from "src/data/model/types/genre"
import PointLog from "./pointLog";

export default class Task{
	constructor(
		readonly id: string,
		readonly title: string,
		readonly body: string,
		readonly genre: Genre,
		readonly createdAt: DateTime | null,
		readonly updatedAt: DateTime | null,
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

	toJson(){
		return {
			id: this.id,
			title: this.title,
			body: this.body,
			genre: this.genre,
			createdAt: this.createdAt?.toJSDate(),
			updatedAt: this.updatedAt?.toJSDate(),
			pointHistory: this.pointHistory.map((pointLog) => ({ point: pointLog.point, gainedAt: pointLog.gainedAt.toJSDate() }))
		}
	}

	static fromJson(id: string, data: Record<string, unknown>){
		return new Task(
			id,
			data.title as string,
			data.body as string,
			data.genre as Genre,
			data.createdAt == null ? null : DateTime.fromJSDate((data.createdAt as any).toDate()),
			data.updatedAt == null ? null : DateTime.fromJSDate((data.updatedAt as any).toDate()),
			(data.pointHistory as unknown[]).map((pointLog: any) => ({ gainedAt: DateTime.fromJSDate((pointLog.gainedAt as any).toDate()), point: pointLog.point }))
		)
	}
}