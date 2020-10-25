import firebase from "firebase"
import { DateTime } from "luxon"
import Task from "src/data/model/domain/task/task"
import AppUser from "src/data/model/domain/user/appUser"
import AddTaskInput from "src/data/model/dto/addTaskInput"
import UnauthenticatedException from "src/data/model/error/unauthenticatedException"
import ITaskDatasource from "src/data/repository/taskRepositry/interface/taskDatasource"
import { firestore } from "src/firebase/initFirebaes"
import Callback from "src/utils/callbackType"

export default class TaskDatasource implements ITaskDatasource {
	private taskRef(appUser: AppUser | null){
		if(appUser == null) throw new UnauthenticatedException()
		return firestore.collection("Schools").doc(appUser.schoolId).collection("Students").doc(appUser.userId).collection("Tasks")
	}

	subscribe(appUser: AppUser, callback: Callback<Task[]>){
		this.taskRef(appUser).onSnapshot(async (snapshots) => {
			const tasks = snapshots.docs.map(snapshot => Task.fromJson(snapshot.id, snapshot.data() as any))
			callback(tasks.sort((a, b) => {
				if (a.updatedAt == null || b.updatedAt == null){
					return 0
				}else{
					return a.updatedAt > b.updatedAt ? 1 : a.updatedAt < b.updatedAt ? -1 : 0
				}
			}))
		})
	}

	async getAllTasks(appUser: AppUser){
		const snapshots = await this.taskRef(appUser).get()
		return snapshots.docs.map(snapshot => Task.fromJson(snapshot.id, snapshot.data() as any))
	}

	async addTask(appUser: AppUser, taskInput: AddTaskInput){
		const docRef = await this.taskRef(appUser).add({
			title: taskInput.title,
			body: taskInput.body,
			genre: taskInput.genre,
			pointHistory: [],
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
		})
		return docRef.id
	}

	async gainPoint(appUser: AppUser, taskId: string, point: number){
		const pointLog = { point, gainedAt: DateTime.local().toJSDate() }
		await this.taskRef(appUser).doc(taskId).update({
			updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
			pointHistory: firebase.firestore.FieldValue.arrayUnion(pointLog)
		})
	}
}
