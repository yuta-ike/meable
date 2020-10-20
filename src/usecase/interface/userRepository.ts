import AppUser from "src/data/model/domain/user/appUser";

export default interface UserRepository{
	readonly appUser: AppUser | null
	readonly isAuthenticated: boolean
	login(): Promise<void>
	logout(): Promise<void>
	destroyUser(): Promise<void>
}