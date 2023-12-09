import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { AnonAadhaarProvider } from 'anon-aadhaar-react'
import { Web3Modal } from '@/components/web3modal'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		window.localStorage.clear()
	}, [])

	return (
		<Web3Modal>
			<AnonAadhaarProvider _appId={process.env.NEXT_PUBLIC_APP_ID as string}>
					<Component {...pageProps} />
			</AnonAadhaarProvider>
		</Web3Modal>
	)
}
