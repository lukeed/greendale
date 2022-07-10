<script lang="ts">
	import Tabs from './tags/Tabs.svelte';
	import Panel from './tags/Panel.svelte';
	import { loading, result } from './stores';

	$: response = $result.res || {};
	$: headers = Object.fromEntries(response.headers || []);
	$: body = $result.content ?? null;
</script>

<Panel>
	<div class="core">
		<dl>
			<dt>Status</dt>
			<dd>{ response.status || 0 }</dd>

			<dt>Time</dt>
			<dd>{ $result.time || 0 }ms</dd>

			<dt>Size</dt>
			<dd>{ $result.length }</dd>
		</dl>
	</div>

	<div class="extras">
		<Tabs labels={['Response', 'Preview']} let:index>
			{#if index === 0}
				<header>
					<h4>Headers</h4>
				</header>

				<pre><code>{ JSON.stringify(headers, null, 2) }</code></pre>

				<header>
					<h4>Body</h4>
				</header>

				<pre><code>{ body }</code></pre>
			{:else if index === 1}
				preview
			{/if}
		</Tabs>
	</div>
</Panel>

<style>
	.core {
		height: 2rem;
		margin-bottom: 1rem;
	}

	.core dl {
		display: grid;
		grid-column-gap: 0.25rem;
		column-gap: 0.25rem;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: repeat(2, 1fr);
		grid-auto-flow: column;
		align-items: center;
		width: 100%;
	}

	.extras h4 {
		margin: 1rem 0;
	}
</style>
