import baseConfig from './rollup.config.base'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import filesize from 'rollup-plugin-filesize'
import { name, version, author } from '../package.json'

const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) 2020-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'
export default {
  input: 'src/index.js',
  // 同时打包多种规范的产物
  output: [
    {
      file: `lib/${name}.umd.js`,
      format: 'umd',
      name: 'u2antd',
      banner,
      plugins: [terser()]
    },
    {
      file: `lib/${name}.esm.js`,
      format: 'esm',
      banner
    }
  ],
  plugins: [
    clear({
      targets: ['lib']
    }),
    ...baseConfig.plugins,
    filesize()
  ],
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    'antd',
    '@ant-design/icons'
  ]
}
