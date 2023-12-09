import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { AnonAadhaarProvider } from 'anon-aadhaar-react'
import { Web3Modal } from '@/components/web3modal'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Web3Modal>
			<AnonAadhaarProvider _appId={process.env.NEXT_PUBLIC_APP_ID as string}>
					<Component {...pageProps} />
			</AnonAadhaarProvider>
		</Web3Modal>
	)
}
