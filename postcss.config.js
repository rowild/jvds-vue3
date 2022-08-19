/* eslint-disable */
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    require("postcss-preset-env")({ stage: 1 }),
    require('postcss-import')({}),
    // require('tailwindcss/nesting')('postcss-nesting'),
    // require("tailwindcss"),
    // https://github.com/postcss/autoprefixer
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 4 Chrome versions',
        'last 4 Firefox versions',
        'last 4 Edge versions',
        'last 4 Safari versions',
        'last 4 Android versions',
        'last 4 ChromeAndroid versions',
        'last 4 FirefoxAndroid versions',
        'last 4 iOS versions'
      ]
    })
  ]
}
