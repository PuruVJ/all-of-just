import { readFile, readdir, writeFile } from 'node:fs/promises';
import pkg from './package.json';
import { format } from 'prettier';

async function make_declaration_file() {
	// Get all Node Modules
	const just_folders = (await readdir('./node_modules/')).filter((folderName) =>
		folderName.startsWith('just-'),
	);

	const just_lib_declarations: Record<string, string> = {};
	for (const folder_name of just_folders) {
		const files = await readdir(`node_modules/${folder_name}`);

		const package_json: typeof pkg = JSON.parse(
			await readFile(`./node_modules/${folder_name}/package.json`, 'utf-8'),
		);

		// Some of these may not belong to just at all and may just be a naming conflict.
		// Filter out based on the `bugs` field of package json
		if (!package_json?.repository?.toString().includes('angus-c/just')) continue;

		// continue if folder doesn't have a `index.d.ts`
		if (!files.includes('index.d.ts')) continue;

		// Everything fine now, let's add to the record and return
		just_lib_declarations[folder_name] = await readFile(
			`./node_modules/${folder_name}/index.d.ts`,
			'utf-8',
		);
	}

	// Now make a the declaration file
	let str = ``;
	for (const [pkgName, dtsContents] of Object.entries(just_lib_declarations)) {
		str += `declare module '${pkgName}' { ${dtsContents.replaceAll('declare', '')} }\n\n`;
	}

	str = await format(str, {
		singleQuote: true,
		tabWidth: 2,
		useTabs: true,
		parser: 'typescript',
	});

	return str;
}

async function modify_index_dts() {
	const dts_files = (await readdir('./dist/')).filter((name) => name.endsWith('.d.ts'));

	const just_module_declarations = await make_declaration_file();
	await writeFile('./dist/just.d.ts', just_module_declarations);

	for (const file of dts_files) {
		const file_contents = await readFile(`./dist/${file}`, 'utf-8');
		writeFile(
			`./dist/${file}`,
			`/// <reference path="./just.d.ts" />` + '\n\n' + file_contents,
			'utf-8',
		);
	}
}

try {
	modify_index_dts();
} catch (error) {
	console.log(error);
}
