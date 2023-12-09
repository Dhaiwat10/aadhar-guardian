import Page from '@/components/page'
import { LogInWithAnonAadhaar } from 'anon-aadhaar-react'

const Index = () => {
	return (
		<Page>
			<p className='text-2xl font-medium text-primary mt-auto'>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua.
			</p>
			<div className='mt-12 w-fit mx-auto'>
				<LogInWithAnonAadhaar />
			</div>
		</Page>
	)
}

export default Index
