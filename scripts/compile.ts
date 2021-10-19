import { build, BuildOptions } from 'esbuild';

const commonConfig: BuildOptions = {
  entryPoints: ['../src/index.ts', '../src/collection.ts', '../src/objects.ts'],
  platform: 'browser',
  bundle: true,
  minify: true,
  sourcemap: true,
  treeShaking: true,
  target: 'esnext',
  outdir: '../dist/',
  tsconfig: '../tsconfig.json',
};

async function main() {
  Promise.all([
    build({
      ...commonConfig,
      format: 'esm',
      outExtension: {
        '.js': '.js',
      },
    }),
    build({
      ...commonConfig,
      format: 'cjs',
      outExtension: {
        '.js': '.cjs',
      },
    }),
  ]);
}

main();
