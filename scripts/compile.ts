import { sync } from 'brotli-size';
import { build, BuildOptions } from 'esbuild';
import { promises as fsp } from 'fs';

const commonConfig: BuildOptions = {
  entryPoints: [
    '../src/index.ts',
    '../src/collection/index.ts',
    '../src/objects/index.ts',
    '../src/arrays/index.ts',
    '../src/statistics/index.ts',
    '../src/strings/index.ts',
    '../src/numbers/index.ts',
    '../src/functions/index.ts',
  ],
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
  await Promise.all([
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

  // Read files again
  const builtFiles = [
    'index.js',
    'arrays/index.js',
    'collection/index.js',
    'objects/index.js',
    'statistics/index.js',
    'strings/index.js',
    'numbers/index.js',
    'functions/index.js',
  ];

  console.log();

  const table = await Promise.all(
    builtFiles.map(async (file) => {
      const size = (sync(await fsp.readFile(`../dist/${file}`)) / 1024).toFixed(2);

      return {
        file: file.replace('/index.js', ''),
        size: size + ' KB',
      };
    })
  );

  console.table(table);

  console.log();
}

main();
