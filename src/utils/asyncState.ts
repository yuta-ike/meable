import { useEffect, useRef } from "react"
import { useState } from "react"

type AsyncState = "waiting" | "pending" | "success" | "error"

class AsyncResult<T>{
	constructor(
		readonly state: AsyncState,
		readonly data: T | null,
		readonly error: unknown,
	) {
	}

	isWaiting(): this is { state: "waiting", data: null, error: null } {
		return this.state === "waiting"
	}
	isPending(): this is { state: "pending", data: null, error: null }{
		return this.state === "pending"
	}
	isSuccess(): this is { state: "success", data: T, error: null } {
		return this.state === "success"
	}
	hasError(): this is { state: "waiting", data: null, error: {} } {
		return this.state === "error"
	}

	isFinished(): this is { state: "success", data: T, error: null } | { state: "error", data: null, error: {} }{
		return this.state === "success" || this.state === "error"
	}

	static init<T>(){
		return new AsyncResult<T>("waiting", null, null)
	}
	static success<T>(data: T){
		return new AsyncResult<T>("success", data, null)
	}
	static error<T>(error: unknown){
		return new AsyncResult<T>("error", null, error)
	}
}

const useAsync = <T>(init: () => Promise<T>): AsyncResult<T> => {
	const promise = useRef<() => Promise<T>>(init)
	const [result, setResult] = useState<AsyncResult<T>>(AsyncResult.init())

	useEffect(() => {
		const func = async () => {
			try{
				const data = await promise.current()
				setResult(AsyncResult.success(data))
			}catch(e){
				setResult(AsyncResult.error(e))
			}
		}
		func()
	}, [])

	return result
}

export default useAsync