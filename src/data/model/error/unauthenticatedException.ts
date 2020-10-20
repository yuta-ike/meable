import BaseException from "./baseException";

export default class UnauthenticatedException extends BaseException{
	constructor(){
		super("UNAUTHENTICATED", "認証されていません")
	}
}