export default class AppUser{
	constructor(
		readonly userId: string,
		readonly email: string,
		readonly schoolId: string,
		readonly classId: string,
		readonly userName: string,
	){}
}