import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import { AnonAadhaarProvider } from 'anon-aadhaar-react'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AnonAadhaarProvider _appId={process.env.NEXT_PUBLIC_APP_ID as string}>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				disableTransitionOnChange
			>
				<Component {...pageProps} />
			</ThemeProvider>
		</AnonAadhaarProvider>
	)
}
