<script lang="ts">
	import Aside from './Aside.svelte';
	import Request from './Request.svelte';
	import Response from './Response.svelte';
</script>

<Aside/>
<Request/>
<Response/>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
	}

	:global(body) {
		display: grid;
		place-content: center;
		grid-template-columns: minmax(26vw,1fr) minmax(37vw,2fr) minmax(37vw,2fr);
		background-color: #dadada;
		overflow: hidden;
		color: #424242;
		height: 100vh;
		width: 100vw;
	}

	:global(body > *) {
		height: 100vh;
		max-height: 100vh;
	}

	:global(input) {
		padding: 0.375rem 0.5rem;
	}

	:global(pre),
	:global(textarea) {
		color: #424242;
		background-color: lightgray;
		border-radius: 4px;
	}
</style>
