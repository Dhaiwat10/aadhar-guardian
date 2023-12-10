/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/button'
import Page from '@/components/page'
import { useRouter } from 'next/router'
import { animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LogInWithAnonAadhaar, useAnonAadhaar } from 'anon-aadhaar-react'
import QRCode from 'qrcode.react'
import { compressProof } from '@/utils'

enum PageState {
	splash,
	uploadAadhar,
	maskedAadharVerified,
	qr,
}

const Index = () => {
	const router = useRouter()
	const [anonAadhar] = useAnonAadhaar()
	const [pageState, setPageState] = useState<PageState>(PageState.splash)
	const [compressedProof, setCompressedProof] = useState<string>()

	// once the user has logged in using aadhar and generated a proof:
	useEffect(() => {
		if (
			anonAadhar.status === 'logged-in' &&
			pageState === PageState.uploadAadhar
		) {
			const img = document.getElementById('shapes') as HTMLImageElement
			animate(img, { scale: 1, rotate: -45 }, { duration: 0.5 })
			setPageState(PageState.maskedAadharVerified)
		}
	}, [anonAadhar, pageState])

	// change state to connect wallet after waiting 2 seconds on maskedAadharVerified
	useEffect(() => {
		if (pageState === PageState.maskedAadharVerified) {
			setTimeout(() => {
				const img = document.getElementById('shapes') as HTMLImageElement
				animate(img, { scale: 1.3 }, { duration: 0.5 })
				setPageState(PageState.qr)
			}, 2000)
		}
	}, [pageState])

	useEffect(() => {
		if (pageState === PageState.qr && anonAadhar.status === 'logged-out') {
			window.location.reload()
		}
	}, [pageState, anonAadhar])

	useEffect(() => {
		if (pageState === PageState.qr && anonAadhar.status === 'logged-in') {
			const compressedProof = compressProof(anonAadhar.pcd)
			setCompressedProof(compressedProof)
		}
	}, [pageState, anonAadhar])

	const [qrValiditySeconds, setQrValiditySeconds] = useState<number>(120)

	const isQrValid = qrValiditySeconds > 0

	useEffect(() => {
		const interval = setInterval(() => {
			setQrValiditySeconds((prevSeconds) => prevSeconds - 1)
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<Page>
			{pageState == PageState.qr && (
				<div className='ml-auto right-8 absolute top-12'>
					<LogInWithAnonAadhaar />
				</div>
			)}

			<img
				src='/images/shapes.svg'
				alt='Shapes'
				className='absolute scale-125 my-auto mx-auto -left-40 self-center -z-20'
				id='shapes'
			/>

			{pageState === PageState.splash && (
				<>
					<p className='text-4xl font-medium text-black mt-auto'>
						Secure Your Aadhaar
					</p>
					<Button
						onClick={() => {
							if (pageState === PageState.splash) {
								const img = document.getElementById(
									'shapes',
								) as HTMLImageElement
								animate(
									img,
									{ scale: 2, rotate: 45, left: '0px' },
									{ duration: 0.5 },
								)
								setPageState(PageState.uploadAadhar)
							}
						}}
						className='mt-12'
					>
						Let&apos;s get started
					</Button>
				</>
			)}

			{pageState === PageState.uploadAadhar && (
				<div className='flex flex-col mt-auto'>
					<div className='shadow px-4 py-6'>
						<label className='text-black rounded-lg text-xl font-medium'>
							I want to prove my:
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

						<div className='relative group inline-block mt-4'>
							<button
								className='px-2 py-1 border shadow rounded-full cursor-pointer text-sm'
								onClick={() => {
									const tooltip = document.getElementById(
										'tooltip',
									) as HTMLElement
									tooltip.style.display = 'block'
									setTimeout(() => {
										tooltip.style.display = 'none'
									}, 3000)
								}}
							>
								ℹ️ Learn More
							</button>
							<div
								id='tooltip'
								className='absolute left-0 z-10 hidden mt-2 w-56 text-sm bg-white border border-gray-200 rounded-lg shadow-lg'
							>
								<p className='p-4'>
									Currently, only location proof is supported, but future
									versions of the Anon Aadhar SDK will have a wider range of
									support.
								</p>
							</div>
						</div>
					</div>
					<div className='mx-auto w-fit mt-6'>
						<LogInWithAnonAadhaar />
					</div>
				</div>
			)}

			{pageState === PageState.maskedAadharVerified && (
				<>
					<p className='text-black text-xl mt-[50vh] font-medium mx-auto'>
						Masked Aadhaar Verified
					</p>
				</>
			)}

			{pageState === PageState.qr && (
				<div className='flex flex-col mt-auto'>
					{compressedProof && (
						<>
							{isQrValid ? (
								<QRCode
									value={compressedProof}
									size={256}
									className='absolute top-[18vh] self-center'
								/>
							) : (
								<p className='text-black text-4xl font-medium absolute top-[28vh] self-center'>
									❗️QR Code Expired
								</p>
							)}
						</>
					)}

					<Button
						onClick={() => {
							if (qrValiditySeconds <= 0) {
								window.localStorage.clear()
								window.location.reload()
							}
						}}
						className='mt-6'
					>
						{qrValiditySeconds > 0 ? (
							<p>
								This QR is only valid for {Math.floor(qrValiditySeconds / 60)}m{' '}
								{qrValiditySeconds % 60}s
							</p>
						) : (
							<p>Regenerate proof</p>
						)}
					</Button>
				</div>
			)}

			<p className='mt-6 mx-auto text-gray-500'>
				Made with ❤️ at EthIndia 2023 🇮🇳
			</p>

			<button
				onClick={() => router.push('/decode')}
				className='absolute bottom-6 shadow rounded-lg w-fit px-4 py-2 opacity-10 self-center'
			>
				Admin panel 🤫
			</button>
		</Page>
	)
}

export default Index
