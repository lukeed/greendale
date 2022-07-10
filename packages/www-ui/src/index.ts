/// <reference lib="dom"/>
/// <reference types="svelte"/>
import App from './Demo.svelte';

let ui = new App({ target: document.body });

// @ts-ignore, magic global?
// @see https://code.visualstudio.com/api/extension-guides/webview#scripts-and-message-passing
const vscode = acquireVsCodeApi();

// Handle vscode -> webview messages
window.addEventListener('message', onmessage);

// Ask for saved requests ASAP
vscode.postMessage({ type: 'req:load' });

interface Message {
	type: string;
	args?: any[];
}

async function onmessage(evt: MessageEvent<Message>) {
	let msg = evt.data; // The JSON data our extension sent
	if (msg.type === 'res:load') {
		console.log('GOT REPLY', msg);
	}
}
