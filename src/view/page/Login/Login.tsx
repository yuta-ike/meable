import React from 'react'
import { useUserUsecase } from 'src/Adapter/UserProvider'

const Login = () => {
	const userUsecase = useUserUsecase()

	const handleLogin = async () => {
		await userUsecase.login()
	}

	return (
		<div>
			<button onClick={handleLogin}>ログイン</button>
		</div>
	)
}

export default Login