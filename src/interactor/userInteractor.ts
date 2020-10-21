import UserRepository from "../usecase/interface/userRepository";
import UserUsecase from "src/usecase/userUsecase";
import AppUser from "src/data/model/domain/user/appUser";

export default class UserInteractor implements UserUsecase{
	constructor(readonly userRepository: UserRepository){}
	
	subscribe(callback: (item: AppUser | null) => void, key?: string){
		this.userRepository.subscribe(callback, key)
	}

	get appUser(){
		return this.userRepository.appUser
	}
	
	get isAuthenticated(){
		return this.userRepository.isAuthenticated
	}
	
	async login(){
		this.userRepository.login()
	}

	async register(schoolSecret: string) {
		this.userRepository.register(schoolSecret)
	}

	async logout() {
		this.userRepository.logout()
	}
	
	async destroyUser() {
		this.userRepository.destroyUser()
	}
}