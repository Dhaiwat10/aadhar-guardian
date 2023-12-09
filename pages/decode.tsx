import Page from '@/components/page'
import { QrReader } from 'react-qr-reader'

import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { decompressProof } from '@/utils'

const Index = () => {
	const [qrResult, setQrResult] = useState<string>()
	const [decompressed, setDecompressed] = useState<string>()

	// useEffect(() => {
	// 	if (qrResult) {
	// 		const decompressed = decompressProof(qrResult)
	// 		setDecompressed(decompressed)
	// 	}
	// }, [qrResult])

	return (
		<Page>
			<h1>Decode</h1>
			<span>isMobile: {isMobile}</span>
			<QrReader
				constraints={{
					facingMode: isMobile ? 'environment' : 'user',
				}}
				onResult={(res) => {
					console.log(res)
					const text = res?.getText()
					if (text) {
						setQrResult(text)
					}
				}}
			/>

			{/* {decompressed && <span>{decompressed}</span>} */}

			<pre>{qrResult}</pre>

			<button
				onClick={() => {
					navigator.clipboard.writeText(qrResult as string)
				}}
			>
				Copy QR result
			</button>
		</Page>
	)
}

export default Index
