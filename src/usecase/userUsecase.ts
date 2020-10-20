import AppUser from "src/data/model/domain/user/appUser";
import Subscribable from "src/utils/subscribe/subscribable";

export default interface UserUsecase extends Subscribable<AppUser | null> {
	readonly appUser: AppUser | null
	readonly isAuthenticated: boolean
	login(): Promise<void>
	logout(): Promise<void>
	destroyUser(): Promise<void>
}