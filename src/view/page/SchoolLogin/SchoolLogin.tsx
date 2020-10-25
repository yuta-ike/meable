import firebase from 'firebase'
import React from 'react'
import { firebaseAuth } from 'src/firebase/initFirebaes'
import useRouting from 'src/view/router/useRouting'

export default function SchoolLogin() {
	const moveTo = useRouting()
	
	const handleLogin = async () => {
		const provider = new firebase.auth.GoogleAuthProvider()
		await firebaseAuth.signInWithPopup(provider)
		moveTo("/home")
	}

	return (
		<div>
			<button onClick={handleLogin}>ログイン</button>
		</div>
	)
}
