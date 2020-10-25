export default class AppUser{
	constructor(
		readonly userId: string,
		readonly email: string,
		readonly schoolId: string,
		readonly classId: string,
		readonly userName: string,
	){}

	get schoolSecret(): string {
		return this.schoolId + this.classId
	}

	get primaryKeys(){
		return { userId: this.userId, schoolSecret: this.schoolSecret }
	}

	isEqualTo(appUser: AppUser | null){
		return appUser != null
				&& this.userId === appUser.userId
				&& this.email === appUser.email
				&& this.schoolSecret === appUser.schoolSecret
				&& this.userName === appUser.userName
	}

	toJson(){
		return {
			userId: this.userId,
			email: this.email,
			schoolId: this.schoolId,
			classId: this.classId,
			userName: this.userName
		}
	}

	static fromJson(data: Record<string, any>){
		return new AppUser(data.userId, data.email, data.schoolId, data.classId, data.userName)
	}
}