// @ts-ignore, magic global?
// @see https://code.visualstudio.com/api/extension-guides/webview#scripts-and-message-passing
const vscode = acquireVsCodeApi();

// type-assertion helper
export function postmessage(msg: gd.Message) {
	vscode.postMessage(msg);
}
