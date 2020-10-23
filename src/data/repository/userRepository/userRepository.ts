import AppUser from "src/data/model/domain/user/appUser"
import UnauthenticatedException from "src/data/model/error/unauthenticatedException"
import IUserRepository from "src/usecase/interface/userRepository"
import IUserDatasource from "./interface/IUserDatasource"

export default class UserRepository implements IUserRepository{
	_appUser: AppUser | null = null
	get appUser() { return this._appUser }
	get isAuthenticated() { return this.appUser != null }

	constructor(readonly datasource: IUserDatasource){
		datasource.subscribe((appUser) => {
			this._appUser = appUser
		}, "userrepository")
	}

	subscribe(callback: (item: AppUser | null) => void, key?: string){
		this.datasource.subscribe(callback, key)
	}

	login(){
		return this.datasource.login()
	}

	register(schoolSecret: string){
		return this.datasource.register(schoolSecret)
	}

	async logout(){
		if (this.appUser == null) return Promise.reject(new UnauthenticatedException())
		try{
			await this.datasource.logout()
			this._appUser = null
		}catch (e){
			throw e
		}
	}

	async destroyUser(){
		if (this.appUser == null) return Promise.reject(new UnauthenticatedException())
		return this.datasource.destroyUser(this.appUser)
	}
}