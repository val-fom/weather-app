import { App } from './app.js'
import { Weather } from './component/weather.js'
import { Forecast } from './component/forecast.js'
import { List } from './component/list.js'
import { Units } from './component/units.js'

// almost all of this code should be in init.js

const weather = new Weather({
	outlet: document.querySelector('#weather-outlet'),
	template: document.querySelector('#weather-outlet > template')
});

const forecast = new Forecast({
	outlet: document.querySelector('#forecast-outlet'),
	template: document.querySelector('#forecast-outlet > template')
});

const history = new List({
	outlet: document.querySelector('#history-outlet'),
	template: document.querySelector('#history-outlet > template'),
	localStorageKey: 'history',
	clearButton: document.querySelector('#clear-history')
});
history.init();

const favourites = new List({
	outlet: document.querySelector('#favourites-outlet'),
	template: document.querySelector('#favourites-outlet > template'),
	localStorageKey: 'favourites',
	clearButton: document.querySelector('#clear-favourites'),
});
favourites.init();

export const units = new Units({
	localStorageKey: 'units',
	toggleButton: document.querySelector('#swap-units-button')
});
units.init();

const WEATHER_APP = new App();
const update = (city) => {
	return WEATHER_APP.getAll(city)
		.then(() => {
			weather.init(WEATHER_APP.responseWeather);
			forecast.init(WEATHER_APP.responseForecast);
		});
}

document.addEventListener('needUpdate', (event) => {
	update(event.detail.city);
});

update();

// should move it somewhere
// to separete component
const form = document.querySelector('#search-form');
const input = form.querySelector('input');
form.onsubmit = () => {
	update(form.elements.cityName.value)
		.then(() => {
			input.value = WEATHER_APP.city;
			history.add(WEATHER_APP.city);
		}, (error) => {
			input.style.background = '#ffd3d3';
			input.oninput = () => input.removeAttribute("style");
			console.error(error);
		})
	return false;
};
// to list component
const addButton = document.querySelector('#add-button');
addButton.onclick = () => {
	favourites.add(WEATHER_APP.city);
}

const rootNode = document.body.addButton;
console.log(rootNode);
