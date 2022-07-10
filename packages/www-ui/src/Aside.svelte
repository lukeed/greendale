<script lang="ts">
	import Tabs from './tags/Tabs.svelte';
	import Thumb from './tags/Thumb.svelte';
	import { suites, request, recents } from './stores';

	function onreset(ev: ClickEvent) {
		ev.preventDefault();
		request.set({
			method: 'GET',
			url: 'https://example.com',
			parameters: [],
			headers: [],
			body: null,
		});
	}
</script>

<aside>
	<button class="new" on:click={onreset}>NEW REQUEST</button>

	<hr>

	<Tabs labels={['Recent', 'Saved']} let:index>
		{#if index === 0}
			{#each $recents.reverse() as req}
				<Thumb name={req.name} request={req}/>
			{:else}
				<div>
					<span>no recent activity</span>
				</div>
			{/each}
		{:else if index === 1}
			{#each $suites as ss (ss.file)}
				{#each Object.keys(ss.tests) as key (key)}
					<Thumb name={key} request={ss.tests[key]}/>
				{/each}
			{:else}
			<div><span>no saved suites yet</span></div>
			{/each}
		{/if}
	</Tabs>
</aside>

<style>
	.new {
		display: block;
		margin: 1rem auto;
		padding: 0.5rem 1.5rem;
		height: 2rem;
	}
</style>
