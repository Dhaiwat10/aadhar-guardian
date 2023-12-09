import Page from '@/components/page'
import { QrReader } from 'react-qr-reader'

import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

const Index = () => {
	return (
		<Page>
			<h1>Decode</h1>
			<span>isMobile: {isMobile}</span>
			<QrReader
				constraints={{
					facingMode: isMobile ? 'environment' : 'user',
				}}
			/>
		</Page>
	)
}

export default Index
