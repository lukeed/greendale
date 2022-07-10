<script lang="ts">
	export let value: gd.Input[] = [];

	let next: gd.Input = {
		key: '',
		value: '',
		enable: true,
	};

	let name: HTMLInputElement;
	function onsubmit(ev: Event) {
		ev.preventDefault();

		value.push({ ...next });
		value = value;
		name.focus();

		next = {
			key: '',
			value: '',
			enable: true,
		};
	}

	function ondelete(ev: ClickEvent) {
		let btn = ev.target as HTMLElement;
		let index = btn && btn.getAttribute('data-index');

		if (index != null) {
			value.splice(+index, 1);
			value = value;
			name.focus();
		}
	}
</script>

<div class="inputs">
	{#each value as input,index (index)}
		<div class="row">
			<input type="checkbox" bind:checked={input.enable}>
			<input type="text" bind:value={input.key} disabled={!input.enable} placeholder="Name">
			<input type="text" bind:value={input.value} disabled={!input.enable} placeholder="Value">
			<button type="button" data-index={index} on:click={ondelete}>&times;</button>
		</div>
	{/each}

	<form on:submit={onsubmit} class="row">
		<input type="checkbox" bind:checked={next.enable} disabled={true}>
		<input bind:this={name} type="text" bind:value={next.key} placeholder="Name">
		<input type="text" bind:value={next.value} placeholder="Value">
		<button type="submit">&plus;</button>
	</form>
</div>

<style>
	.row {
		display: grid;
		grid-template-columns: 24px 1fr 1fr 24px;
		grid-column-gap: 0.25rem;
		margin-bottom: 0.25rem;
		align-items: center;
	}
</style>
