/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#6C9F5D',
				},
				gray: {
					DEFAULT: '#878C86'
				}
			}

		},
	},
	plugins: [],
}

