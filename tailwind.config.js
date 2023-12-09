module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	plugins: [require('tailwindcss-safe-area')],
	theme: {
		extend: {
			colors: {
				white: '#ffffff',
				black: '#000000',
				primary: '#2EB4AB',
				secondary: '#49D59E',
				grey: '#00000029',
			},
		},
	},
}
