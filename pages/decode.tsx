import Page from '@/components/page'
import { QrReader } from 'react-qr-reader'

import { useEffect, useState } from 'react'

const useIsOnMobile = () => {
	const [isOnMobile, setIsOnMobile] = useState<boolean>(false)

	useEffect(() => {
		const userAgent =
			typeof window.navigator === 'undefined' ? '' : navigator.userAgent
		const mobile =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				userAgent,
			)
		setIsOnMobile(mobile)
	}, [])

	return isOnMobile
}

const Index = () => {
	const isOnMobile = useIsOnMobile()

	return (
		<Page>
			<h1>Decode</h1>
			<QrReader
				constraints={{
					facingMode: isOnMobile ? 'environment' : 'user',
				}}
			/>
		</Page>
	)
}

export default Index
