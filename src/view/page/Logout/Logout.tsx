import React from 'react'
import useRouting from 'src/view/router/useRouting'

export default function Logout() {
	const moveTo = useRouting()
	return (
		<div>
			ログアウトしました
			<button onClick={moveTo("/login")}>ログインページへ</button>
		</div>
	)
}
