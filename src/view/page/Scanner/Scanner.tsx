import React from 'react'
import QrReader from 'react-qr-reader'
import useRouting from 'src/view/router/useRouting'

export default function Scanner() {
	const moveTo = useRouting()

	const handleScan = (data: string | null) => {
		if(data != null && data.length > 0){
			const frags = data.split("/")
			if(frags[frags.length - 2] !== "task") return
			moveTo(`/task/${frags[frags.length - 1]}`)()
		}
	}

	const handleError = () => {
		console.log("error")
	}

	return (
		<div>
			<QrReader
				delay={300}
				onError={handleError}
				onScan={handleScan}
				style={{ width: '100%' }}
			/>
		</div>
	)
}
