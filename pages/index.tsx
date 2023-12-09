import { Button } from '@/components/button'
import Page from '@/components/page'
import Section from '@/components/section'
import { LogInWithAnonAadhaar, useAnonAadhaar } from 'anon-aadhaar-react'
import { useAccount } from 'wagmi'

const Index = () => {
	const [aadharState] = useAnonAadhaar()

	const { address } = useAccount()

	return (
		<Page>
			<p className='text-2xl font-medium text-primary'>
				Lorem ipsum dolor sit amet,
				consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</p>
			<Button className='mb-0 mt-auto'>Let&apos;s get started</Button>
		</Page>
	)
}

export default Index
