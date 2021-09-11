import baseConfig from './rollup.config.base'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'examples/src/app.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    ...baseConfig.plugins,
    serve({
      open: true,
      port: 8080,
      verbose: true,
      contentBase: ['', 'examples/src'],
      openPage: '/index.html'
    }),
    livereload({ watch: 'examples/src' })
  ]
}
