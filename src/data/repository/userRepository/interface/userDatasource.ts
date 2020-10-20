import AppUser from "src/data/model/domain/user/appUser";
import Subscribable from "src/utils/subscribe/subscribable";

export default interface UserDatasource extends Subscribable<AppUser | null>{
	login(): Promise<AppUser>
	logout(): Promise<void>
	destroyUser(appUser: AppUser): Promise<void>
}