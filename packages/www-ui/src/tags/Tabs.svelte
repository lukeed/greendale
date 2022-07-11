<script lang="ts">
	export let index = 0;
	export let labels: string[] = [];

	function onselect(ev: ClickEvent) {
		ev.preventDefault();
		let elem = ev.target as HTMLElement;
		let idx = elem && elem.getAttribute('data-index');
		if (idx != null) index = +idx;
	}
</script>

<div class="tabs">
	<nav>
		{#each labels as txt,idx (idx)}
			<a
				data-index={idx}
				class:active={idx === index}
				href="javascript:void(0)"
				on:click={onselect}
			>{ txt }</a>
		{/each}

		{#if $$slots.right}
			<div class="right">
				<slot name="right"/>
			</div>
		{/if}
	</nav>

	<div class="tabs-content">
		<slot {index}></slot>
	</div>
</div>

<style>
	.tabs {
		height: calc(100vh - 2rem - 32px);
	}

	.tabs-content {
		overflow-y: auto;
		padding: 0 0.5rem;
		max-height: calc(100% - 2rem);
	}

	.tabs nav {
		height: 2rem;
		display: flex;
		position: relative;
		border-bottom: 1px solid blue;
	}

	nav .right {
		top: 50%;
		right: 0.25rem;
		position: absolute;
		transform: translateY(-50%);
	}

	nav a {
		text-decoration: none;
		border-bottom: 2px solid transparent;
		padding: 0.5rem 0.75rem;
	}

	nav a.active {
		border-bottom-color: blue;
		color: #333;
	}
</style>
