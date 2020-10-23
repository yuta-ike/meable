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
	
	login(){
		return this.userRepository.login()
	}

	register(schoolSecret: string) {
		return this.userRepository.register(schoolSecret)
	}

	logout() {
		return this.userRepository.logout()
	}
	
	destroyUser() {
		return this.userRepository.destroyUser()
	}
}