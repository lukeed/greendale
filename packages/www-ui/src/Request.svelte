<script lang="ts">
	import Tabs from './tags/Tabs.svelte';
	import Panel from './tags/Panel.svelte';
	import Repeat from './tags/Repeat.svelte';
	import { request, send } from './stores';

	const NOBODY = /GET|HEAD/;
	const METHODS = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'];

	let form: HTMLFormElement;
	async function onsubmit(ev: Event) {
		ev.preventDefault();
		console.log('inside onsubmit', $request);
		await send($request);
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
				{#if index === 0}
					<h4>Query Parameters</h4>
					<Repeat value={$request.parameters}/>
				{:else if index === 1}
					<h4>Request Headers</h4>
					<Repeat value={$request.headers}/>
				{:else if index === 2}
					<h4>Request Body</h4>
					<textarea name="body" disabled={NOBODY.test($request.method)}>{ $request.body }</textarea>
				{:else if index === 3}
					<h4>Response Assertion(s)</h4>
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
