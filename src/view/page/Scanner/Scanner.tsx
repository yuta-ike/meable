import React from 'react'
import QrReader from 'react-qr-reader'
import useRouting from 'src/view/router/useRouting'

export default function Scanner() {
	const moveTo = useRouting()

	const handleScan = (data: string | null) => {
		if(data != null && data.length > 0){
			console.log(data)
			const frags = data.split("/")
			if(frags[frags.length - 3] !== "task") return
			moveTo(`/task/${frags[frags.length - 2]}/gain`)()
		}
	}

	const handleError = () => {
		console.log("error")
	}

	return (
		<div className="scanner-page">
			<QrReader
				delay={300}
				onError={handleError}
				onScan={handleScan}
				style={{ width: '100%' }}
			/>
			<div className="back-button-wrapper">
				<div className="back-button" role="button" onClick={moveTo(`/`, { delay: true })}>もどる</div>
			</div>
		</div>
	)
}
