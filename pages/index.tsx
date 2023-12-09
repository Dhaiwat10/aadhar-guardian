import Page from '@/components/page'
import Section from '@/components/section'
import { LogInWithAnonAadhaar, useAnonAadhaar } from 'anon-aadhaar-react'
import QRCode from 'react-qr-code'

const Index = () => {
	const [aadharState] = useAnonAadhaar()

	console.log({
		aadharState,
	})

	return (
		<Page>
			<Section>
				<LogInWithAnonAadhaar />

				{aadharState.status === 'logged-in' && (
					<div>
						<pre>{JSON.stringify(aadharState.pcd, null, 2)}</pre>
						<QRCode value={JSON.stringify(aadharState.pcd)} />
					</div>
				)}
			</Section>
		</Page>
	)
}

export default Index
