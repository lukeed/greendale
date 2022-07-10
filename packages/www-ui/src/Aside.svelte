<script lang="ts">
	import Tabs from './tags/Tabs.svelte';
	import Thumb from './tags/Thumb.svelte';
	import { suites, recents } from './stores';
</script>

<aside>
	<button>NEW REQUEST</button>

	<hr>

	<Tabs labels={['Recent', 'Saved']} let:index>
		{#if index === 0}
			{#each $recents as req}
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
