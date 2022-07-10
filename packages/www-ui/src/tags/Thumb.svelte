<script lang="ts">
	import * as stores from '../stores';

	export let name = '';
	export let request: gd.Request;

	$: title = name || request.name;

	function setActive() {
		request.name = name || request.name || '';
		stores.request.set(request);
	}
</script>

<div class="req" on:click|stopPropagation={setActive}>
	{#if title}<strong>{ title }</strong>{/if}
	<span class="method">{ request.method }</span>
	<span class="url">{ request.url }</span>
</div>
