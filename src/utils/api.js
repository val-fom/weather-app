const KEY = '40c8d4e755a53b1d45a970fc3769eeeb';
const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/';
const count = '&cnt=' + 8; // 24/3 hour forecast

export const get = (apiType, units, city) => {
	const url = BASE_API_URL + apiType + '?q=' + city +
		'&APPID=' + KEY + '&units=' + units + count; // json place holder vvvvv
// let url = 'https://my-json-server.typicode.com/val-fom/weather-app/weather';
	return fetch(url).then(response => {
		if (response.ok) {
			return response.json();
		}
		throw new Error(response.statusText);
	});
};

const getWeather = city => get('weather', 'metric', city);
const getForecast = city => get('forecast', 'metric', city);

const getAll = city =>
	Promise.all([getWeather(city), getForecast(city)]);

export default getAll;
