import BaseException from "./baseException";

export default class TaskUnfoundException extends BaseException{
	constructor(){
		super("TASK_UNFOUND", "該当のタスクが見つかりませんでした")
	}
}