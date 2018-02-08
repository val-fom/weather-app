const KEY = '40c8d4e755a53b1d45a970fc3769eeeb';
const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/';
const count = '&cnt=' + 8; // 24/3 hour forecast

export const get = (apiType, units, city) => {
	const url = BASE_API_URL + apiType + '?q=' + city +
		'&APPID=' + KEY + '&units=' + units + count;

	return fetch(url).then(response => {
		if (response.ok) {
			return response.json();
		}
		throw new Error('api response was not ok.')
	});
};
