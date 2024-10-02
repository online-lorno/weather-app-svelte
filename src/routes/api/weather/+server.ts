import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OPENWEATHER_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
	const city = url.searchParams.get('city');
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');

	let apiUrl: string;

	if (city) {
		apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
	} else if (lat && lon) {
		apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
	} else {
		return json({ error: 'Invalid parameters' }, { status: 400 });
	}

	const response = await fetch(apiUrl);
	const data = await response.json();

	return json(data);
};
