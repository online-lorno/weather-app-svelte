<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { debounce } from 'lodash-es';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	const dispatch = createEventDispatcher<{ citySelect: string }>();

	let searchTerm = '';
	let suggestions: string[] = [];

	const fetchSuggestions = debounce(async () => {
		console.log({ searchTerm });
		if (searchTerm.length < 3) {
			suggestions = [];
			return;
		}

		const response = await fetch(
			`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchTerm}&limit=5`,
			{
				headers: {
					'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_GEODB_KEY,
					'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_GEODB_HOST
				}
			}
		);

		const data = await response.json();
		suggestions = data.data.map((city: any) => city.name);
	}, 300);

	function handleInput() {
		fetchSuggestions();
	}

	function handleSelect(city: string) {
		searchTerm = city;
		suggestions = [];
		dispatch('citySelect', city);
	}
</script>

<div class="relative">
	<Input
		type="text"
		placeholder="Search for a city..."
		bind:value={searchTerm}
		on:input={handleInput}
	/>
	{#if suggestions.length > 0}
		<ul class="absolute z-10 mt-1 w-full rounded-md border border-input bg-background">
			{#each suggestions as suggestion}
				<li>
					<Button
						variant="ghost"
						class="w-full text-left"
						on:click={() => handleSelect(suggestion)}
					>
						{suggestion}
					</Button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
