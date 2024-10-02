import type { PageServerLoad } from './$types';
import { OPENWEATHER_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async () => {
	const defaultCity = 'New York';
	const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=${OPENWEATHER_API_KEY}&units=metric`;

	const response = await fetch(apiUrl);
	const weatherData = await response.json();

	return {
		defaultCity,
		weatherData
	};
};
