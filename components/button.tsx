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
			className={`px-8 py-5 text-primary border-2 text-2xl border-primary rounded-full ${className}`}
			{...remainingProps}
		>
			{children}
		</button>
	)
}
