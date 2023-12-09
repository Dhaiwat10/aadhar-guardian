import Page from '@/components/page'
import { QrReader } from 'react-qr-reader'

import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

const Index = () => {
	const [qrResult, setQrResult] = useState<string>()
	const [decompressed, setDecompressed] = useState<string>()

	// useEffect(() => {
	// 	if (qrResult) {
	// 		const decompressed = JSON.parse(qrResult)
	// 		setDecompressed(JSON.stringify(decompressed, null, 2))
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
					setQrResult(res?.getText())
				}}
			/>

			{decompressed && <span>{decompressed}</span>}

			<pre>{JSON.stringify(qrResult, null, 2)}</pre>
		</Page>
	)
}

export default Index
