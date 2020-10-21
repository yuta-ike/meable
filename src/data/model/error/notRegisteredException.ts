import BaseException from "./baseException";

export default class NotRegisteredException extends BaseException{
	constructor(){
		super("NOT_REGISTERED", "とうろく されて いません")
	}
}