import App from './App.js'

const app = new App(document.getElementById('root'));

app.render();

//****************** OLD *********************
import { App1 } from './app1.js'
import { Weather } from './component/weather.js'
import { Forecast } from './component/forecast.js'
import { List } from './component/list.js'
import { Units } from './component/units.js'

const weather = new Weather({
	outlet: document.querySelector('[data-weather]'),
	template: document.querySelector('[data-weather] > template')
});

const forecast = new Forecast({
	outlet: document.querySelector('[data-forecast]'),
	template: document.querySelector('[data-forecast] > template')
});

const history = new List({
	outlet: document.querySelector('[data-history]'),
	template: document.querySelector('[data-history] > template'),
	localStorageKey: 'history',
	clearButton: document.querySelector('[data-history-clear]')
});
history.init();

const favourites = new List({
	outlet: document.querySelector('[data-favourites]'),
	template: document.querySelector('[data-favourites] > template'),
	localStorageKey: 'favourites',
	clearButton: document.querySelector('[data-favourites-clear]'),
});
favourites.init();

export const units = new Units({
	localStorageKey: 'units',
	toggleButton: document.querySelector('[data-units-toggle]')
});
units.init();

const WEATHER_APP = new App1();
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
const form = document.querySelector('[data-search]');
const input = form.querySelector('input');
/*form.onsubmit = () => {
	update(form.elements.search.value)
	// update(form.elements.search.value.trim())
		.then(() => {
			input.value = WEATHER_APP.city;
			history.add(WEATHER_APP.city);
		}, (error) => {
			// input.style.background = '#ffd3d3';
			// input.oninput = () => input.removeAttribute("style");
			// console.error(error);
		})
	return false;
};*/
// to list component
const addButton = document.querySelector('[data-favourites-add]');
addButton.onclick = () => {
	favourites.add(WEATHER_APP.city);
}

// const rootNode = document.body;
// console.log(rootNode);

// console.log(WEATHER_APP);
