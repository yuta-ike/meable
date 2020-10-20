import React from 'react'
import { useUserUsecase } from 'src/Adapter/UserProvider'

export default function Login() {
	const userUsecase = useUserUsecase()
	const handleLogin = () => {
		userUsecase.login()
	}
	return (
		<div>
			<button onClick={handleLogin}>ログイン</button>
		</div>
	)
}
