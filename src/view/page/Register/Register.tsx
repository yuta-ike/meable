import React, { useState } from 'react'
import { useUserUsecase } from 'src/Adapter/UserProvider'

export default function Register() {
	const userUsecase = useUserUsecase()

	const [schoolSecret, setSchoolSecret] = useState("")
	const isValid = schoolSecret.length === 6
	const [errorMessage, setErrorMessage] = useState("")

	const handleRegister = async () => {
		setErrorMessage("")
		if (isValid) {
			try{
				await userUsecase.register(schoolSecret)
			}catch(e){
				if (e.code === "FORM_INVALID"){
					setErrorMessage(e.message)
				}else{
					setErrorMessage("エラーが はっせい しました")
				}
			}
		}
	}

	return (
		<div className="register-page">
			<div className="input-area">
				<div className="secret-label" aria-label="secret-input">先生から教えてもらった6もじの秘密の言葉を入力してね</div>
				<input type="text" id="secret-input" className="secret-input" value={schoolSecret} onChange={e => setSchoolSecret(e.target.value)} />
				{
					errorMessage !== "" && (
						<div className="error-message">
							{errorMessage}
						</div>
					)
				}
				<div className="submit-button-wrapper">
					<div
						role="button"
						className={"submit-button" + (isValid ? "" : " submit-button-disabled")}
						onClick={handleRegister}
						aria-disabled={!isValid}
					>
						{
							schoolSecret.length < 6 ? `あと ${6 - schoolSecret.length}もじ！` :
							schoolSecret.length > 6 ? `${schoolSecret.length - 6}もじ おおいよ！` :
							"かんりょうしたらタップ！"
						}
					</div>
				</div>
			</div>
		</div>
	)
}
