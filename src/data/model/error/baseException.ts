export default abstract class BaseException extends Error{
	constructor(readonly code: string, readonly message: string){
		super(message);
	}
}