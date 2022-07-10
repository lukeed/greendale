import * as vscode from 'vscode';
import HTML from 'greendale-ui/public/index.html';
import type { Callback, Context } from './index';

export interface Message {
	type: string;
	args?: any[];
}

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

function onmessage(msg: Message) {
	// load existing requests
	if (msg.type === 'req:load') {
		console.log('INSIDE LOAD', msg);
		panel!.webview.postMessage({
			type: 'res:load',
			args: [1, 2, 3],
		});
	}

	console.warn('UNKNOWN MSG REQUEST', msg);
}
