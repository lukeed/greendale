import * as fs from 'node:fs';
import * as http from 'node:http';
import { dirname } from 'node:path';
import * as watchlist from 'watchlist';
import { build, INPUT, OUTPUT } from './build';

let input = dirname(INPUT);
await watchlist.watch([input], build, { eager: true });

http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/html');
	fs.createReadStream(OUTPUT).pipe(res);
}).listen(8080, () => {
	console.log('~> ready on "http://localhost:8080"~!');
});
