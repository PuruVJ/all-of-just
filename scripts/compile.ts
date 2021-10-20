import { build, BuildOptions } from 'esbuild';
import { promises as fsp } from 'fs';
import { sync } from 'brotli-size';

const commonConfig: BuildOptions = {
  entryPoints: [
    '../src/index.ts',
    '../src/collection.ts',
    '../src/objects.ts',
    '../src/arrays.ts',
    '../src/statistics.ts',
    '../src/strings.ts',
    '../src/numbers.ts',
    '../src/functions.ts',
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
  // Make dist if not exists
  try {
    await fsp.mkdir('../dist');
  } catch {}

  // Clear the directory first
  const files = await fsp.readdir('../dist/');

  for (const file of files) await fsp.unlink('../dist/' + file);

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
    ...(await fsp.readdir('../dist/')).filter(
      (file) => file.endsWith('.js') && !file.startsWith('index')
    ),
  ];

  console.log();

  const table = await Promise.all(
    builtFiles.map(async (file) => {
      const size = (sync(await fsp.readFile(`../dist/${file}`)) / 1024).toFixed(2);

      return {
        file,
        size: size + ' KB',
      };
    })
  );

  console.table(table);

  console.log();
}

main();
