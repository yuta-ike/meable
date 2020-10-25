import firebase from "firebase";
import AppUser from "src/data/model/domain/user/appUser";
import toAppUser from "src/data/model/domain/user/userMap";
import FormInvalidException from "src/data/model/error/formInvalidException";
import UnauthenticatedException from "src/data/model/error/unauthenticatedException";
import IUserDatasource from "src/data/repository/userRepository/interface/IUserDatasource";
import { firebaseAuth, firestore } from "src/firebase/initFirebaes";
import Callback from "src/utils/callbackType";

export default class UserDatasource implements IUserDatasource{
	private callbacks: Callback<AppUser | null>[] = []

	private _appUser: AppUser | null = null
	private get appUser() { return this._appUser }
	private set appUser(appUser: AppUser | null){
		this._appUser = appUser
		this.dispatch(appUser)
	}

	constructor(){
		firebaseAuth.onAuthStateChanged(async (user) => {
			if(user == null){
				this.appUser = null
			}else{
				try{
					const snapshot = await firestore.collection("Affiliation").doc(user.uid).get()
					if (!snapshot.exists) {
						this.appUser = toAppUser(user)
					}else{
						const _user = snapshot.data()
						const appUser = toAppUser(user, _user?.schoolId, _user?.classId)
						this.appUser = appUser
					}
				}catch(e){
					console.log(e)
					this.appUser = toAppUser(user)
				}
			}
		})
	}

	subscribe(callback: Callback<AppUser | null>, key?: string){
		this.callbacks.push(callback)
	}

	private dispatch(appUser: AppUser | null){
		this.callbacks.forEach((callback) => callback(appUser))
	}

	async register(schoolSecret: string){
		if(this.appUser == null) throw new UnauthenticatedException()

		const schoolId = schoolSecret.slice(0, 4)
		const classId = schoolSecret.slice(4, 6)
		try{
			const appUser = this.appUser
			await firestore.collection("Schools").doc(schoolId).collection("Students").doc(appUser.userId).set({
				...appUser!.toJson(),
				schoolId,
				classId,
				userId: appUser.userId,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
			})
			await firestore.collection("Affiliation").doc(appUser.userId).set({ schoolId, classId })
			this.appUser = new AppUser(appUser.userId, appUser.email, schoolId, classId, appUser.userName)
		} catch (e) {
			// TODO: エラーハンドリング改善
			//もしschoolが存在しなければ
			// classが存在しなければ
			console.log(e)
			return Promise.reject(new FormInvalidException({"schoolSecret": "ひみつ の ことば が まちがって います"}))
		}
	}

	async login(){
		const provider = new firebase.auth.GoogleAuthProvider()
		provider.setCustomParameters({ redirect_uri: "http://localhost:3000/task/VRERtQoPATLi9yrKuXse"})
		await firebaseAuth.signInWithRedirect(provider)
	}

	async logout(){
		await firebaseAuth.signOut()
	}

	async destroyUser(){
		console.error("UNIMPLEMENTED!!")
	}
}