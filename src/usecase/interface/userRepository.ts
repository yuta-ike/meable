import AppUser from "src/data/model/domain/user/appUser";
import Subscribable from "src/utils/subscribe/subscribable";

export default interface UserRepository extends Subscribable<AppUser | null>{
	readonly appUser: AppUser | null
	readonly isAuthenticated: boolean
	register(schoolSecret: string): Promise<void>
	login(): Promise<void>
	logout(): Promise<void>
	destroyUser(): Promise<void>
}