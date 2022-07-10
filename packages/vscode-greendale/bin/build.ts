import * as esbuild from 'esbuild';

const INPUT = 'src/index.ts';
const OUTPUT = 'output/extension.js';

await esbuild.build({
	bundle: true,
	minify: true,
	platform: 'node',
	entryPoints: [INPUT],
	outfile: OUTPUT,
	format: 'cjs',
	loader: {
		'.html': 'text'
	},
	external: [
		'vscode'
	]
})
