import { Button } from '@/components/button'
import Page from '@/components/page'
import Section from '@/components/section'
import { LogInWithAnonAadhaar, useAnonAadhaar } from 'anon-aadhaar-react'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

const Index = () => {
	const router = useRouter()

	return (
		<Page>
			<p className='text-5xl font-medium text-black mt-auto'>
				Secure Your Aadhaar
			</p>
			<Button onClick={() => router.push('/upload-aadhar')} className='mt-12'>Let&apos;s get started</Button>
		</Page>
	)
}

export default Index
