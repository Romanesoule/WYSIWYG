const defaultTheme = require('tailwindcss/defaultTheme')
const defaultColors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'storme-primary': '#13131C',
        'storme-secondary': '#0D0D14',
        'storme-secondary-2': '#1A1A27',
        'storme-secondary-3': '#27273C',
        'storme-teal': '#00C6C2',
        'storme-orange': '#F79542',
        'storme-orange-2': '#F68A2B',
        'storme-orange-3': '#F57E15',
        'storme-orange-4': '#EB730A',
        'storme-red': '#ED1A59',
        ...defaultColors,
      },
      spacing: {
        'width-editor': '670px',
        'height-editor': '378px',
      },
      appearance: ['hover', 'focus'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}