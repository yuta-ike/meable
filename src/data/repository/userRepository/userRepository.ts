import AppUser from "src/data/model/domain/user/appUser"
import UnauthenticatedException from "src/data/model/error/unauthenticatedException"
import IUserRepository from "src/usecase/interface/userRepository"
import UserDatasource from "./interface/userDatasource"

export default class UserRepository implements IUserRepository{
	_appUser: AppUser | null = null
	get appUser() { return this._appUser }
	get isAuthenticated() { return this.appUser != null }

	constructor(readonly datasource: UserDatasource){}

	async login(){
		const appUser = await this.datasource.login()
		this._appUser = appUser
	}

	async logout(){
		if (this.appUser == null) throw new UnauthenticatedException()
		try{
			await this.datasource.logout()
			this._appUser = null
		}catch (e){
			throw e
		}
	}

	async destroyUser(){
		if (this.appUser == null) throw new UnauthenticatedException()
		return this.datasource.destroyUser(this.appUser)
	}
}