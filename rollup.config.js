import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

import pkg from './package.json';

const SRC_FILE = path.resolve(__dirname, 'lib', 'main.ts');
const BUILD_PATH = path.resolve(__dirname, 'build');

const BANNER = `/**
  Package: ${pkg.name}
  ${pkg.description}
  Version: ${pkg.version}
  Build: ${new Date().toUTCString()}
  @license: ${pkg.license}
  @preserve
*/`;

const config = [
  // CommonJS
  {
    input: SRC_FILE,
    output: {
      file: path.resolve(BUILD_PATH, `${pkg.name}.cjs.js`),
      format: 'cjs',
      banner: BANNER,
      indent: false,
    },
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      typescript(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  },

  // ES
  {
    input: SRC_FILE,
    output: {
      file: path.resolve(BUILD_PATH, `${pkg.name}.es.js`),
      format: 'es',
      banner: BANNER,
      indent: false,
    },
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      typescript(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  },

  // UMD development
  {
    input: SRC_FILE,
    output: {
      file: path.resolve(BUILD_PATH, `${pkg.name}.umd.js`),
      format: 'umd',
      name: pkg.name,
      globals: {
        react: 'React',
      },
      banner: BANNER,
      indent: false,
    },
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      typescript(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  },

  // UMD production
  {
    input: SRC_FILE,
    output: {
      file: path.resolve(BUILD_PATH, `${pkg.name}.umd.min.js`),
      format: 'umd',
      name: pkg.name,
      globals: {
        react: 'React',
      },
      banner: BANNER,
      indent: false,
    },
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      typescript(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
        output: {
          comments: /@preserve|@license/,
        },
      }),
    ],
  },
];

export default config;