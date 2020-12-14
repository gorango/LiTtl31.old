module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV !== 'prod' ? [] : [
      require('@fullhuman/postcss-purgecss')({
        content: [
          './src/index.pug'
        ]
      }),
      require('cssnano')
    ])
  ]
}
