const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#58D4E1',
        secondary: '#FDF9F3',
        paste: {
          100: '#def6f9',
          200: '#bceef3',
          300: '#9be5ed',
          400: '#79dde7',
          500: '#58d4e1',
          600: '#46aab4',
          700: '#357f87',
          800: '#23555a',
          900: '#122a2d',
        },
        teal: colors.teal,
      },
      fontFamily: {
        KohinoorBangla: ['KohinoorBangla', 'Nunito', 'Arial'],
        siliguri: ['Hind Siliguri', 'Nunito', 'Arial'],
        mono: ['Fira Code', 'techdiary-bangla', 'monospace']
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()'
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`
        })
      })
    })
  ],
}
