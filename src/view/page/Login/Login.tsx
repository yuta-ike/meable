import React from 'react'
import { useUserUsecase } from 'src/Adapter/UserProvider'

const Login = () => {
	const userUsecase = useUserUsecase()

	const handleLogin = async () => {
		await userUsecase.login()
	}

	return (
		<div className="login-page">
			<div className="header"/>
			<div className="login-button" role="button" onClick={handleLogin}>
				<div className="login-label">みあぶる を はじめる！<br/><span className="login-caption">（Googleでログイン）</span></div>
			</div>
		</div>
	)
}

export default Login