// 安装以下 npm 包
import { nodeResolve } from '@rollup/plugin-node-resolve' // 解析 node_modules 中的模块
import commonjs from '@rollup/plugin-commonjs' // cjs => esm
import alias from '@rollup/plugin-alias' // alias 和 reslove 功能
import replace from '@rollup/plugin-replace'
// import eslint from '@rollup/plugin-eslint'
import { babel } from '@rollup/plugin-babel'
import json from '@rollup/plugin-json' // 支持在源码中直接引入json文件，不影响下面的
import postcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript'

export default {
  // 注意 plugin 的使用顺序
  plugins: [
    postcss({
      minimize: process.env.NODE_ENV === 'production',
      use: ['sass']
    }),
    json(),
    alias(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      preventAssignment: true
    }),
    // typescript(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts', '.jsx', 'tsx']
    })
  ]
}
