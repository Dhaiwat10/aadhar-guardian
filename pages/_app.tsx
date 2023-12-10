import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { AnonAadhaarProvider } from 'anon-aadhaar-react'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		window.localStorage.clear()
	}, [])

	return (
		<AnonAadhaarProvider _appId={process.env.NEXT_PUBLIC_APP_ID as string}>
			<Component {...pageProps} />
		</AnonAadhaarProvider>
	)
}
