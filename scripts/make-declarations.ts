import { promises as fsp, writeFile } from 'fs';
import type { PackageJson } from 'type-fest';
import prettier from 'prettier';

export async function makeDeclarationFile() {
  // Get all Node Modules
  const justFolders = (await fsp.readdir('../node_modules/')).filter((folderName) =>
    folderName.startsWith('just-')
  );

  const justLibDeclarations: Record<string, string> = {};
  for (const folderName of justFolders) {
    const files = await fsp.readdir(`../node_modules/${folderName}`);

    const packageJson: PackageJson = JSON.parse(
      await fsp.readFile(`../node_modules/${folderName}/package.json`, 'utf-8')
    );

    // Some of these may not belong to just at all and may just be a naming conflict.
    // Filter out based on the `bugs` field of package json
    if (!packageJson?.repository?.toString().includes('angus-c/just')) continue;

    // continue if folder doesn't have a `index.d.ts`
    if (!files.includes('index.d.ts')) continue;

    // Everything fine now, let's add to the record and return
    justLibDeclarations[folderName] = await fsp.readFile(
      `../node_modules/${folderName}/index.d.ts`,
      'utf-8'
    );
  }

  // Now make a the declaration file
  let str = ``;
  for (const [pkgName, dtsContents] of Object.entries(justLibDeclarations)) {
    str += `declare module '${pkgName}' { ${dtsContents.replaceAll('declare', '')} }\n\n`;
  }

  str = prettier.format(str, {
    singleQuote: true,
    tabWidth: 2,
    useTabs: true,
    parser: 'typescript',
  });

  return str;
}
