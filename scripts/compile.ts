import { sync } from 'brotli-size';
import { build, BuildOptions } from 'esbuild';
import { promises as fsp, readFile } from 'fs';
import pkg from '../package.json';
import { makeDeclarationFile } from './make-declarations';

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

async function compile() {
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
    'arrays.js',
    'collection.js',
    'objects.js',
    'statistics.js',
    'strings.js',
    'numbers.js',
    'functions.js',
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

async function movePackageJson() {
  // Stuff to remove
  const { scripts, devDependencies, dependencies, ...targetPkgJson } = pkg;

  targetPkgJson.private = false;

  await fsp.writeFile('../dist/package.json', JSON.stringify(targetPkgJson, null, 2));
}

async function modifyIndexDTS() {
  const indexDTSFile = await fsp.readFile('../dist/index.d.ts', 'utf-8');

  const justModuleDeclarations = await makeDeclarationFile();

  await fsp.writeFile(
    '../dist/index.d.ts',
    justModuleDeclarations + '\n\n' + indexDTSFile,
    'utf-8'
  );
}

await compile();
modifyIndexDTS();
await movePackageJson();
