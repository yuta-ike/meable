import { useEffect } from "react"
import { useReducer } from "react"


const usePrevious = <T>(current: T) => {
	const [state, dispatch] = useReducer(
		(prevObj: { prev: T | null, current: T }, current: T): { prev: T | null, current: T } => ({ prev: prevObj.current, current }),
		{prev: null, current},
	)
	
	useEffect(() => {
		dispatch(current)
	}, [current])
	
	return state.prev
}

export default usePrevious