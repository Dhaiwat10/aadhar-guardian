import { Button } from '@/components/button'
import Page from '@/components/page'

const Index = () => {
	return (
		<Page>
			<p className='text-2xl font-medium text-primary mt-auto'>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua.
			</p>
			<Button className='mt-12'>
				Tap to reveal QR code
			</Button>
		</Page>
	)
}

export default Index
