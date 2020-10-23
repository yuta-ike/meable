import { useHistory } from 'react-router-dom'
import { ConfirmDialogType } from '../page/Home/Home'

const useRouting = () => {
	const history = useHistory()
	const moveTo = (path: string, {delay = false, confirm}: { delay?: boolean, confirm?: ConfirmDialogType} = {}) => async () => {
		const pathname = confirm == null ? path : `${path}?modaltype=${confirm}`
		if(!delay){
			history.push(pathname)
			return
		}else{
			setTimeout(() => {
				history.push(pathname)
			}, 300)
		}
	}
	return moveTo
}

export default useRouting