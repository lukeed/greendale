import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { existsSync, promises as fs } from 'node:fs';
import { typescript } from 'svelte-preprocess-esbuild';
import * as svelte from 'svelte/compiler';
import * as esbuild from 'esbuild';

const isBUILD = process.argv.includes(
	fileURLToPath(import.meta.url)
);

export const INPUT = 'src/index.ts';
export const TEMPLATE = 'src/index.html';
export const OUTPUT = 'public/index.html';

export async function build() {
	let styles = '';

	let result = await esbuild.build({
		write: false,
		bundle: true,
		format: 'esm',
		splitting: false,
		entryPoints: [INPUT],
		treeShaking: true,
		minify: true,
		plugins: [{
			name: 'svelte',
			setup(build) {
				// @see https://esbuild.github.io/plugins/#svelte-plugin
				build.onLoad({ filter: /\.svelte$/ }, async (args) => {
					let filename = args.path;
					let source = await fs.readFile(filename, 'utf8');

					// This converts a message in Svelte's format to esbuild's format
					function convertMessage(err: any): esbuild.PartialMessage {
						let { start, end } = err;
						let loc: Partial<esbuild.Location> | undefined;

						if (start && end) {
							let text = source.split(/\r\n|\r|\n/g)[start.line - 1];
							let pos = start.line === end.line ? end.column : text.length
							loc = {
								file: filename,
								line: start.line,
								column: start.column,
								length: pos - start.column,
								lineText: text,
							};
						}
						return {
							text: err.message,
							location: loc || null,
						};
					}

					try {
						let { code, map } = await svelte.preprocess(source, typescript());
						let result = svelte.compile(code, {
							filename: filename,
							sourcemap: map,
							css: false,
						});

						if (result.css && result.css.code) {
							styles += result.css.code;
						}

						return {
							contents: result.js.code + `//# sourceMappingURL=` + result.js.map.toUrl(),
							warnings: result.warnings.map(convertMessage),
						};
					} catch (err) {
						return {
							errors: [convertMessage(err)]
						}
					}
				});
			}
		}]
	});

	if (result.outputFiles.length !== 1) {
		throw new Error('Incorrect output file count!');
	}

	let METAs = await fs.readFile(TEMPLATE, 'utf8');

	let script = result.outputFiles[0].text;
	let ASSETs = '<style>' + styles + '</style>\n';
	ASSETs += '<script type=module>' + script + '</script>';

	let outfile = resolve(OUTPUT);
	let outdir = dirname(outfile);
	existsSync(outdir) || await fs.mkdir(outdir);
	await fs.writeFile(outfile, `<!doctype html><head lang=en>${METAs + ASSETs}</head></html>`);

	console.log('\n~> wrote "public/index.html" output\n');
}

if (isBUILD) {
	await build();
}
