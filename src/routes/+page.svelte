<script lang="ts">
	import { onMount } from 'svelte';
	import CitySearch from '$lib/components/CitySearch.svelte';
	import WeatherDisplay from '$lib/components/WeatherDisplay.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let selectedCity: string = data.defaultCity;
	let weatherData = data.weatherData;

	async function handleCitySelect(event: CustomEvent<string>) {
		selectedCity = event.detail;
		const response = await fetch(`/api/weather?city=${selectedCity}`);
		weatherData = await response.json();
	}

	onMount(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const { latitude, longitude } = position.coords;
				const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
				weatherData = await response.json();
			});
		}
	});
</script>

<svelte:head>
	<title>Weather Dashboard</title>
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Weather Dashboard</h1>

<div class="grid gap-4 md:grid-cols-2">
	<div>
		<CitySearch on:citySelect={handleCitySelect} />
	</div>
	<div>
		<WeatherDisplay {weatherData} />
	</div>
</div>
