import BaseException from "./baseException";

export default class UnexpectedException extends BaseException{
	constructor(){
		super("UNEXPECTED", "申し訳ありません。想定外のエラーが発生しました。")
	}
}