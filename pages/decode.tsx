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
					<h1 className='text-3xl font-medium'>Merchant view</h1>
					<ol className='text-gray-600 text-sm'>
						<li>1. Select the Aadhar fields you want to verify.</li>
						<li>
							2. Ask the citizen to generate a proof and a QR code from the
							Aadhaar Shield app.
						</li>
						<li>3. Scan the QR code.</li>
						<li>
							4. The app will tell you if the presented proof is valid or not.
						</li>
					</ol>

					<hr className='my-4' />

					<label className='text-black rounded-lg font-medium'>
						Fields you want to verify:
					</label>
					<div className='flex flex-row'>
						<label>
							<input type='checkbox' defaultChecked disabled />
							<span className='ml-2'>Age</span>
						</label>
						<label className='ml-4'>
							<input type='checkbox' disabled />
							<span className='ml-2 opacity-20'>Name</span>
						</label>
						<label className='ml-4'>
							<input type='checkbox' disabled />
							<span className='ml-2 opacity-20'>Location</span>
						</label>
					</div>

					<h3 className='text-black font-medium mt-4'>Scan the QR:</h3>

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
					<h1>Verifying Proof...</h1>
				</div>
			)}

			{pageState === PageState.proofVerified && (
				<div className='flex flex-col items-center'>
					<h1 className='text-4xl font-medium'>
						{proofVerifiedRes ? 'Proof verified!' : 'Proof invalid!'}
					</h1>

					<button className='mt-4' onClick={() => window.location.reload()}>
						Scan another QR
					</button>
				</div>
			)}
		</Page>
	)
}

export default Index
