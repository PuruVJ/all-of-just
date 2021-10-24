import { readdir, unlink } from 'fs/promises';

const filesInDist = await readdir('../dist/');
for (const file of filesInDist) unlink(`../dist/${file}`);
