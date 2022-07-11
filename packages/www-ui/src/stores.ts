import { klona } from 'klona/json';
import { writable } from 'svelte/store';
import * as assert from 'uvu/assert';

// active / WIP request to send
export const request = writable<gd.Request>({
	method: 'GET',
	url: 'https://jsonplaceholder.typicode.com/todos',
	parameters: [],
	headers: [],
	body: null,
});

// request is in transit
export const loading = writable(false);

// recent request history
export const recents = writable<gd.Request[]>([]);

// saved / persisted greendale suites
export const suites = writable<gd.Suite[]>([]);

interface Result {
	res?: Response;
	time?: number;
	valid?: boolean | undefined;
	length?: string;
	content?: string | null | FormData | ArrayBuffer;
}

export const result = writable<Result>({
	//
});

export async function send(req: gd.Request, validation?: string): Promise<void> {
	let headers = new Headers;
	let url = new URL(req.url, 'http://localhost:8080'); // TODO: $baseurl here

	console.log('SEND', { req });

	// TODO: use codemirror/etc for editor w/ intellisense
	// TODO: have user write the contents w/ TLA -> new Function(args, contents);
	if (validation) req.assert = eval(validation);

	if (/GET|HEAD/.test(req.method)) req.body = undefined;

	(req.headers || []).forEach(input => {
		if (input.enable) headers.append(input.key, input.value);
	});

	(req.parameters || []).forEach(input => {
		if (input.enable) url.searchParams.append(input.key, input.value);
	});

	let now = Date.now();

	// TODO: env handling
	// TODO: $baseurl replace
	// TODO: if "/foobar" prepend $baseurl

	loading.set(true);
	let res = await fetch(url.href, {
		headers: headers,
		method: req.method,
		redirect: 'manual',
		body: req.body,
		mode: 'cors',
	});
	loading.set(false);

	let valid: boolean | undefined;
	let time = Date.now() - now;

	if (typeof req.assert === 'function') {
		try {
			let copy = new Response(res.body, res);
			let x = await req.assert(copy, assert);
			valid = x == null || !!x;
		} catch (err) {
			// TODO: print error
			console.error('VALIDATION ERROR', err);
			valid = false;
		}
	}

	let num = (await res.clone().arrayBuffer()).byteLength;
	let length = num < 1024 ? `${num} B` : `${(num/1024).toFixed(2)} kB`;

	let content: Result['content'] = null;
	let ctype = res.headers.get('content-type') || '';
	if (ctype.includes('text/')) content = await res.text();
	else if (ctype.includes('application/json')) content = await res.text();
	else if (ctype.includes('multipart/form-data')) content = await res.formData();
	else if (ctype.includes('/x-www-form-urlencoded')) content = await res.formData();
	else content = await res.arrayBuffer();

	let clone = klona(req);
	recents.update(arr => arr.concat(clone));
	result.set({ res, time, valid, length, content });
}
