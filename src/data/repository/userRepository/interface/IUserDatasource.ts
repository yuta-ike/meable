import AppUser from "src/data/model/domain/user/appUser";
import Subscribable from "src/utils/subscribe/subscribable";

export default interface IUserDatasource extends Subscribable<AppUser | null>{
	register(schoolSecret: string): Promise<void>
	login(): Promise<void>
	logout(): Promise<void>
	destroyUser(appUser: AppUser): Promise<void>
}