module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('postcss-import'),
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
s;
