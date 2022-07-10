/// <reference lib="dom"/>
/// <reference types="svelte"/>
import App from './App.svelte';
import { suites } from './stores';
import { postmessage } from './bridge';

let ui = new App({ target: document.body });

// Handle vscode -> webview messages
window.addEventListener('message', onmessage);

// Ask for saved requests ASAP
postmessage({ type: 'req:load' });

async function onmessage(evt: MessageEvent<gd.Message>) {
	let msg = evt.data;
	if (msg.type === 'res:load') {
		console.log('INSIDE LOAD', msg.value);
		return msg.value && suites.set(msg.value);
	}
}
