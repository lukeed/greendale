<script lang="ts">
	import * as stores from '../stores';

	export let name = '';
	export let request: gd.Request;

	$: title = name || request.name;

	function setActive() {
		let clone = { ...request };
		clone.name = name || clone.name;
		stores.request.set(clone);
	}
</script>

<div class="req" on:click|stopPropagation={setActive}>
	{#if title}<strong>{ title }</strong>{/if}
	<span class="method">{ request.method }</span>
	<span class="url">{ request.url }</span>
</div>

<style>
	.req {
		padding: 1rem 0.5rem;
		background: white;
		border-radius: 4px;
		box-shadow: 0 1px 4px rgba(0,0,0,0.24);
		margin: 0.25rem -0.25rem;
		cursor: pointer;
	}
</style>
