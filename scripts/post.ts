import { promises as fsp } from 'fs';
import pkg from '../package.json';
import { makeDeclarationFile } from './make-declarations';

async function movePackageJson() {
  // Stuff to remove
  const { scripts, devDependencies, dependencies, ...targetPkgJson } = pkg;

  targetPkgJson.private = false;

  fsp.writeFile('../dist/package.json', JSON.stringify(targetPkgJson, null, 2));
}

async function moveREADME() {
  const readmeContents = await fsp.readFile('../README.md', 'utf-8');
  fsp.writeFile('../dist/README.md', readmeContents);
}

async function modifyIndexDTS() {
  const dtsFiles = (await fsp.readdir('../dist/')).filter((name) => name.endsWith('.d.ts'));

  const justModuleDeclarations = await makeDeclarationFile();
  await fsp.writeFile('../dist/just.d.ts', justModuleDeclarations);

  for (const file of dtsFiles) {
    const fileContents = await fsp.readFile(`../dist/${file}`, 'utf-8');
    fsp.writeFile(
      `../dist/${file}`,
      `/// <reference path="./just.d.ts" />` + '\n\n' + fileContents,
      'utf-8'
    );
  }
}

try {
  await modifyIndexDTS();
  await movePackageJson();
  await moveREADME();
} catch (error) {
  console.log(error);
}
