import Page from '@/components/page'
import { QrReader } from 'react-qr-reader'

import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { decompressProof, exampleProof, verifyProof } from '@/utils'
import { AnonAadhaarPCD } from 'anon-aadhaar-pcd'

enum PageState {
	scanning,
	verifyingProof,
	proofVerified,
}

const Index = () => {
	const [qrResult, setQrResult] = useState<string>()
	const [decompressed, setDecompressed] = useState<AnonAadhaarPCD>()
	const [pageState, setPageState] = useState<PageState>(PageState.scanning)
	const [proofVerifiedRes, setProofVerifiedRes] = useState<boolean>()

	useEffect(() => {
		if (qrResult) {
			setDecompressed(decompressProof(qrResult))
		}
	}, [qrResult])

	useEffect(() => {
		;(async () => {
			if (pageState === PageState.scanning && decompressed) {
				setPageState(PageState.verifyingProof)
				const res = await verifyProof(decompressed)
				setProofVerifiedRes(res)
			}
		})()
	}, [decompressed, pageState])

	useEffect(() => {
		// wait on verifyingProof state for 2 seconds and then change to proofVerified
		if (pageState === PageState.verifyingProof) {
			setTimeout(() => {
				setPageState(PageState.proofVerified)
			}, 2000)
		}
	}, [pageState])

	return (
		<Page>
			{pageState === PageState.scanning && (
				<>
					<h1>Decode</h1>
					<span>isMobile: {isMobile}</span>
					<QrReader
						constraints={{
							facingMode: isMobile ? 'environment' : 'user',
						}}
						onResult={(res) => {
							const text = res?.getText()
							if (text) {
								setQrResult(text)
							}
						}}
					/>
				</>
			)}

			{pageState === PageState.verifyingProof && (
				<div className='flex flex-col'>
					<h1>Verifying Proof</h1>
				</div>
			)}

			{pageState === PageState.proofVerified && (
				<div className='flex flex-col items-center'>
					<h1 className='text-4xl font-medium'>Proof Verified</h1>
					<p>{proofVerifiedRes ? 'true' : 'false'}</p>
				</div>
			)}
		</Page>
	)
}

export default Index
