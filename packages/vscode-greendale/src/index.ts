import * as vscode from 'vscode';
import HTML from 'greendale-ui/public/index.html';

export function setup(ctx: vscode.ExtensionContext) {
	console.log('hello', HTML);
}
