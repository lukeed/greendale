import * as path from 'path';
import * as vscode from 'vscode';
import HTML from 'greendale-ui/public/index.html';

import type { Callback } from './index';

let panel: vscode.WebviewPanel | void;
export const open: Callback = function (ctx) {
	if (panel) {
		panel.reveal(vscode.ViewColumn.One);
	} else {
		panel = vscode.window.createWebviewPanel('html', 'Greendale', vscode.ViewColumn.One, { enableScripts: true });
		panel.webview.html = HTML;

		panel.onDidDispose(onreset, undefined, ctx.subscriptions);
		panel.webview.onDidReceiveMessage(onmessage, undefined, ctx.subscriptions);
	}
}

function onreset() {
	panel = undefined;
}

function postmessage(msg: gd.Message) {
	return panel!.webview.postMessage(msg);
}

async function onmessage(msg: gd.Message) {
	// load existing requests
	if (msg.type === 'req:load') {
		return await reload();
	}

	if (msg.type === 'req:save') {
		await write(msg.value);
		return await reload();
	}

	console.warn('UNKNOWN MSG REQUEST', msg);
}

async function reload() {
	return postmessage({
		type: 'res:load',
		value: await loader(),
	});
}

async function loader(): Promise<gd.Suite[]> {
	let files = await vscode.workspace.findFiles('greendale.js');
	let i=0, suites: gd.Suite[] = [];

	for (; i < files.length; i++) {
		suites.push({
			file: files[i].fsPath,
			tests: require(files[i].fsPath)
		});
	}

	return suites;
}

async function write(suite: gd.Suite) {
	// stringify
	let content = '';
	for (let k in suite.tests) {
		let req = suite.tests[k];
		content += `exports['${k}'] = ${JSON.stringify(req)};\n`;
		if (req.assert) content += `exports['${k}'].assert = ${req.assert};\n`;
		content += '\n';
	}

	if (!suite.file) {
		let dirs = vscode.workspace.workspaceFolders;
		let dir = dirs && dirs[0].uri.fsPath;

		if (dir) suite.file = path.join(dir, 'greendale.js');
		else return vscode.window.showErrorMessage('Cannot save Greendale file without a workspace!');
	}

	let uri = vscode.Uri.file(suite.file);
	let buffer = Buffer.from(content, 'utf8');
	await vscode.workspace.fs.writeFile(uri, buffer);

	vscode.window.showInformationMessage(`Wrote "${uri.fsPath}" file~!`);
}
