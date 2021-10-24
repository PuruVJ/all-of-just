// @ts-check
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: [
    './src/index.ts',
    './src/collection.ts',
    './src/objects.ts',
    './src/arrays.ts',
    './src/statistics.ts',
    './src/strings.ts',
    './src/numbers.ts',
    './src/functions.ts',
  ],
  plugins: [commonjs(), nodeResolve(), typescript({ tsconfig: './tsconfig.json' })],
  output: [
    {
      format: 'esm',
      dir: './dist/',
      minifyInternalExports: true,
      sourcemap: true,
    },
    {
      format: 'cjs',
      entryFileNames: '[name].[format]',
      dir: './dist/',
      minifyInternalExports: true,
      sourcemap: true,
    },
  ],
});
