/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/button'
import Page from '@/components/page'
import { useRouter } from 'next/router'
import { animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LogInWithAnonAadhaar, useAnonAadhaar } from 'anon-aadhaar-react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import QRCode from 'qrcode.react'
import { compressProof } from '@/utils'

enum PageState {
	splash,
	uploadAadhar,
	maskedAadharVerified,
	connectWallet,
	qr,
}

const Index = () => {
	const router = useRouter()
	const [anonAadhar] = useAnonAadhaar()
	const [pageState, setPageState] = useState<PageState>(PageState.splash)
	const { open: openWeb3Modal } = useWeb3Modal()
	const [connectButtonPressed, setConnectButtonPressed] = useState(false)
	const { address } = useAccount()
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
				setPageState(PageState.connectWallet)
			}, 2000)
		}
	}, [pageState])

	useEffect(() => {
		if (
			pageState === PageState.connectWallet &&
			address &&
			connectButtonPressed
		) {
			const img = document.getElementById('shapes') as HTMLImageElement
			animate(img, { scale: 1.3 }, { duration: 0.5 })
			setPageState(PageState.qr)
		}
	}, [pageState, address, connectButtonPressed])

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

	return (
		<Page>
			<button onClick={() => router.push('/decode')}>Decode</button>

			{pageState == PageState.qr && (
				<div className='ml-auto mr-0'>
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
					<p className='text-black shadow px-4 py-6 rounded-lg text-xl'>
						Text explaining what this step does, asking user their intent
						forward
					</p>
					<div className='mx-auto w-fit mt-6'>
						<LogInWithAnonAadhaar />
						{/* <Button
							onClick={() => {
								const img = document.getElementById(
									'shapes',
								) as HTMLImageElement
								animate(img, { scale: 1, rotate: -45 }, { duration: 0.5 })
								setPageState(PageState.maskedAadharVerified)
							}}
						>
							Upload Aadhar
						</Button> */}
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

			{pageState === PageState.connectWallet && (
				<div className='flex flex-col mt-auto'>
					<p className='text-black shadow px-4 py-6 rounded-lg text-xl'>
						Text explaining what this step does, asking user their intent
						forward
					</p>
					<div className='mx-auto w-fit mt-6'>
						<Button
							onClick={async () => {
								setConnectButtonPressed(true)
								await openWeb3Modal()
							}}
						>
							Connect Wallet
						</Button>
					</div>
				</div>
			)}

			{pageState === PageState.qr && (
				<div className='flex flex-col mt-auto'>
					{/* <p className='text-black shadow px-4 py-6 rounded-lg text-xl'>
						Text explaining what this step does, asking user their intent
						forward
					</p> */}
					{compressedProof && (
						<QRCode
							value={compressedProof}
							size={256}
							className='absolute top-[18vh] self-center'
						/>
					)}
					<Button className='mt-6'>Tap to Reveal QR Code</Button>
				</div>
			)}

			<p className='mt-6 mx-auto text-gray-500'>Made with ❤️ at EthIndia 2023 🇮🇳</p>
		</Page>
	)
}

export default Index
