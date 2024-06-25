// @ts-check
import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	entry: {
		index: './src/index.ts',
		collection: './src/collection.ts',
		objects: './src/objects.ts',
		arrays: './src/arrays.ts',
		statistics: './src/statistics.ts',
		strings: './src/strings.ts',
		numbers: './src/numbers.ts',
		functions: './src/functions.ts',
	},
	format: 'esm',
	outDir: './dist/',
	bundle: true,
	noExternal: [/^just-/],
});
