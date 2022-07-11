<script lang="ts">
	import { klona } from 'klona/json';
	import Tabs from './tags/Tabs.svelte';
	import Panel from './tags/Panel.svelte';
	import Repeat from './tags/Repeat.svelte';
	import { request, suites, send } from './stores';
	import { postmessage } from './bridge';

	const NOBODY = /GET|HEAD/;
	const METHODS = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'];

	let assertion = $request.assert || '';
	let validation = String(assertion);

	let form: HTMLFormElement;
	async function onsubmit(ev: Event) {
		ev.preventDefault();
		await send($request, validation);
	}

	function onsave(ev: Event) {
		ev.preventDefault();

		let arr = klona($suites);
		let req = klona($request);

		console.log({ suites: arr, req });

		if (arr.length > 1) {
			console.log('TODO: track current suite');
		}

		let suite: gd.Suite = arr[0] || {
			file: null,
			tests: {},
		};

		// merge current request into suites
		suite.tests[`${req.method} ${req.url}`] = req;

		postmessage({
			type: 'req:save',
			value: suite,
		});
	}
</script>

<Panel>
	<form bind:this={form} on:submit={onsubmit}>
		<div class="core">
			<select bind:value={$request.method} name="method">
				{#each METHODS as value (value)}
				<option {value}>{value}</option>
				{/each}
			</select>

			<input type="text" bind:value={$request.url} name="url"/>

			<button type="submit">SEND</button>
		</div>

		<hr>

		<div class="extras">
			<Tabs labels={['Params', 'Headers', 'Body', 'Validation']} let:index>
				<button slot="right" on:click={onsave}>SAVE</button>

				{#if index === 0}
					<h4>Query Parameters</h4>
					<Repeat value={$request.parameters}/>
				{:else if index === 1}
					<h4>Request Headers</h4>
					<Repeat value={$request.headers}/>
				{:else if index === 2}
					<h4>Request Body</h4>
					<textarea
						name="body"
						disabled={NOBODY.test($request.method)}
						bind:value={ $request.body }
						autocapitalize="off"
						spellcheck="false"
						autocorrect="off"
					></textarea>
				{:else if index === 3}
					<h4>Response Assertion(s)</h4>
					<textarea
						bind:value={validation}
						autocapitalize="off"
						spellcheck="false"
						autocorrect="off"
					></textarea>
				{/if}
			</Tabs>
		</div>
	</form>
</Panel>

<style>
	.core {
		height: 2rem;
		display: grid;
		padding: 1rem 0.25rem;
		align-items: center;
		grid-template-columns: max-content auto 3rem;
		grid-column-gap: 0.25rem;
		column-gap: 0.25rem;
	}

	.extras h4 {
		margin: 1rem 0;
	}

	form input,
	form select,
	form button {
		height: 100%;
	}
</style>
