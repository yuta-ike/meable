import UserRepository from "../usecase/interface/userRepository";
import UserUsecase from "src/usecase/userUsecase";
import AppUser from "src/data/model/domain/user/appUser";

export default class UserInteractor implements UserUsecase{
	constructor(readonly appuserRepository: UserRepository){}
	
	subscribe(callback: (item: AppUser | null) => void, key?: string){
		this.appuserRepository.subscribe(callback, key)
	}

	get appUser(){
		return this.appuserRepository.appUser
	}
	
	get isAuthenticated(){
		return this.appuserRepository.isAuthenticated
	}
	
	async login() {
		this.appuserRepository.login()
	}

	async logout() {
		this.appuserRepository.logout()
	}
	
	async destroyUser() {
		this.appuserRepository.destroyUser()
	}
}