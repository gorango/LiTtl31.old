const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['audimat', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  variants: {
    extend: {},
  }
}
