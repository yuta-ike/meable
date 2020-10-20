import AppUser from "src/data/model/domain/user/appUser";
import generateAppUser from "src/data/model/domain/user/faker/userFaker";
import UserDatasource from "src/data/repository/userRepository/interface/userDatasource";


type Callback = (appUser: AppUser | null) => void

export default class MockUserDatasource implements UserDatasource{
	_appUser: AppUser | null = null
	_callbacks: { [key: string]: Callback[] } = {}

	//TODO: replace with uuid
	// TODO: 最初のディスパッチのタイミング
	subscribe(callback: Callback, key: string = "REPLACE_WITH_UUID") {
		if (this._callbacks[key] == null) {
			this._callbacks[key] = [callback]
		} else {
			this._callbacks[key].push(callback)
		}
	}

	async login(){
		console.log("LOGIN")
		this._appUser = await Promise.resolve(generateAppUser())
		this._dispatch()
		return this._appUser
	}

	async logout(){
		this._appUser = null
		console.log("LOGOUT")
		this._dispatch()
	}

	async destroyUser(appUser: AppUser){
		console.log(`DESTORY: ${appUser.userId}`)
		this._appUser = null
		this._dispatch()
	}

	_dispatch() {
		console.log(this._callbacks)
		Object.values(this._callbacks).forEach(callbacks => callbacks.forEach(callback => callback(this._appUser)))
	}
}