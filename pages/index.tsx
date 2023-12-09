/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/button'
import Page from '@/components/page'
import { useRouter } from 'next/router'
import { animate } from 'framer-motion'

const Index = () => {
	return (
		<Page>
			<img
				src='/images/shapes.svg'
				alt='Shapes'
				className='absolute scale-125 my-auto mx-auto -left-40 self-center'
				id='shapes'
			/>
			<p className='text-4xl font-medium text-black mt-auto'>
				Secure Your Aadhaar
			</p>
			<Button
				onClick={() => {
					const img = document.getElementById('shapes') as HTMLImageElement
					console.log({
						img,
					})
					animate(img, { scale: 2, rotate: 45, left: '0px' }, { duration: 0.5 })
				}}
				className='mt-12'
			>
				Let&apos;s get started
			</Button>
		</Page>
	)
}

export default Index
