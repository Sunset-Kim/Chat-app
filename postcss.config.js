module.exports = {
  plugins: [
    require('postcss-import'),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
