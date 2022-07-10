/// <reference lib="dom"/>
/// <reference types="svelte"/>
import App from './Demo.svelte';

let ui = new App({ target: document.body });
console.log({ ui });
