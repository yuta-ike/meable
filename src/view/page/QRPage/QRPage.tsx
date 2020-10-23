import React from 'react'
import { useParams } from 'react-router-dom'
import QRCode from "qrcode.react"
import useRouting from 'src/view/router/useRouting'

const QRPage: React.FC = () => {
	const { taskId } = useParams<{taskId: string}>()
	const moveTo = useRouting()

	
	return (
		<div className="qr-page">
			<div className="qr-wrapper">
				<QRCode value={`${window.location.origin}/task/${taskId}/gain`} size={150}/>
			</div>
			<div className="back-button-wrapper">
				<div className="back-button" role="button" onClick={moveTo(`/task/${taskId}`, { delay: true })}>もどる</div>
			</div>
		</div>
	)
}

export default QRPage