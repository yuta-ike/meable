import AppUser from "src/data/model/domain/user/appUser";
import generateAppUser from "src/data/model/domain/user/faker/userFaker";
import UserDatasource from "src/data/repository/userRepository/interface/userDatasource";

export default class MockUserDatasource implements UserDatasource{
	async login(){
		console.log("LOGIN")
		return await Promise.resolve(generateAppUser())
	}
	async logout(){
		console.log("LOGOUT")
	}
	async destroyUser(appUser: AppUser){
		console.log(`DESTORY: ${appUser.userId}`)
	}
}