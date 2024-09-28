/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#15803D',
				},
				secondary: {
					DEFAULT: '#FFFFFF'
				}
			},
		},
	},
	plugins: [],
}

