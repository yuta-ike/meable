import React, { useState } from 'react'
import { useUserUsecase } from 'src/Adapter/UserProvider'

export default function Register() {
	const userUsecase = useUserUsecase()

	const [schoolSecret, setSchoolSecret] = useState("")
	const isValid = schoolSecret.length === 6

	const handleRegister = () => {
		if (isValid) userUsecase.register(schoolSecret)
	}

	return (
		<div>
			<input type="text" value={schoolSecret} onChange={e => setSchoolSecret(e.target.value)} />
			<button onClick={handleRegister} disabled={!isValid}>新規登録</button>
		</div>
	)
}
