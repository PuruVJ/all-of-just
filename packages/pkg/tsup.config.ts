// @ts-check
import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	entry: {
		index: './src/index.ts',
		collections: './src/collections.ts',
		objects: './src/objects.ts',
		arrays: './src/arrays.ts',
		statistics: './src/statistics.ts',
		strings: './src/strings.ts',
		numbers: './src/numbers.ts',
		functions: './src/functions.ts',
	},
	dts: true,
	banner: {
		js: `/// <reference path="./just.d.ts" />`,
	},
	treeshake: 'smallest',
	format: 'esm',
	target: 'es2022',
	platform: 'browser',
	outDir: './dist/',
	bundle: true,
	noExternal: [/^just-/],
});
