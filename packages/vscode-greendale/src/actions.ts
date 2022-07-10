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
		return postmessage({
			type: 'res:load',
			value: await loader(),
		});
	}

	console.warn('UNKNOWN MSG REQUEST', msg);
}

async function loader(): Promise<gd.Suite[]> {
	let files = await vscode.workspace.findFiles('greendale.js');
	let i=0, suites: gd.Suite[] = [];
	for (; i < files.length; i++) {
		suites.push({
			file: files[i].fsPath,
			tests: require(files[i].fsPath),
		});
	}
	return suites;
}
