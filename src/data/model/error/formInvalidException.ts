import BaseException from "./baseException";

export default class FormInvalidException extends BaseException{
	constructor(readonly invalidParameters: Record<string, string>){
		super("FORM_INVALID", "入力内容が正しくありません")
	}
}