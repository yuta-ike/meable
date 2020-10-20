import AppUser from "src/data/model/domain/user/appUser";

export default interface UserDatasource{
	login(): Promise<AppUser>
	logout(): Promise<void>
	destroyUser(appUser: AppUser): Promise<void>
}