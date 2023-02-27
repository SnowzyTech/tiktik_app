const { defineConfig } = require('vite');
const postcssConfig = require('./postcss.config.js');
const tailwindcss = require('tailwindcss');

module.exports = defineConfig({
  plugins: [
    require('postcss-import'),
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
  ],
  css: {
    postcss: {
      plugins: postcssConfig.plugins,
    },
  },
});
