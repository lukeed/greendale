<script lang="ts">
	import { klona } from 'klona/json';
	import * as stores from '../stores';

	export let request: gd.Request;

	function setActive() {
		stores.request.set(
			klona(request)
		);
	}
</script>

<div class="req" on:click|stopPropagation={setActive}>
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
