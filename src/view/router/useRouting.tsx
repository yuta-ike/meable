import { useHistory } from 'react-router-dom'

const useRouting = () => {
	const history = useHistory()
	const moveTo = (path: string) => () => {
		history.push(path)
	}
	return moveTo
}

export default useRouting