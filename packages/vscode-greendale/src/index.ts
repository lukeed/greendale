import * as vscode from 'vscode';
import * as greendale from './actions';

export type Context = vscode.ExtensionContext;
export type Callback = (context: Context) => Promise<void> | void;

function register(ctx: Context, command: string, callback: Callback) {
	ctx.subscriptions.push(
		vscode.commands.registerCommand(command, callback.bind(callback, ctx))
	);
}

export function activate(ctx: Context) {
	// Each of these commands must be defined in package.json
	register(ctx, 'greendale.open', greendale.open);
}

export function deactivate(ctx: Context) {
	console.log('> DEACTIVATED');
}
