import { Button } from '@/components/button'
import Page from '@/components/page'
import { useRouter } from 'next/router'

const Index = () => {
	const router = useRouter()

	return (
		<Page>
			<img src='/images/shapes.svg' alt='Shapes' className='absolute -left-40' />
			<p className='text-5xl font-medium text-black mt-auto'>
				Secure Your Aadhaar
			</p>
			<Button onClick={() => router.push('/upload-aadhar')} className='mt-12'>
				Let&apos;s get started
			</Button>
		</Page>
	)
}

export default Index
