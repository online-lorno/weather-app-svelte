<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	export let weatherData: any;

	$: currentWeather = weatherData?.list?.[0];
	$: forecast = weatherData?.list?.slice(1, 6);

	function formatDate(timestamp: number): string {
		return new Date(timestamp * 1000).toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

{#if currentWeather}
	<Card>
		<CardHeader>
			<CardTitle>{weatherData.city.name}</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="text-4xl font-bold">{Math.round(currentWeather.main.temp)}°C</div>
			<div>{currentWeather.weather[0].description}</div>
			<div>Humidity: {currentWeather.main.humidity}%</div>
			<div>Wind: {currentWeather.wind.speed} m/s</div>
		</CardContent>
	</Card>

	<div class="mt-4 grid grid-cols-5 gap-2">
		{#each forecast as day}
			<Card>
				<CardHeader>
					<CardTitle class="text-sm">{formatDate(day.dt)}</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="text-lg font-bold">{Math.round(day.main.temp)}°C</div>
					<div class="text-xs">{day.weather[0].description}</div>
				</CardContent>
			</Card>
		{/each}
	</div>
{:else}
	<div>Loading weather data...</div>
{/if}
