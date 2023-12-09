import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export const Button = (
	props: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>,
) => {
	const { className, children, ...remainingProps } = props

	return (
		<button
			className={`px-8 py-5 text-white text-2xl rounded-lg shadow bg-gradient-to-b from-secondary to-primary ${className}`}
			{...remainingProps}
		>
			{children}
		</button>
	)
}
