import { Weather } from './weather.js'
import { WeatherComponent } from './component/weather.component.js'
import { ForecastComponent } from './component/forecast.component.js'
import { ListComponent } from './component/list.component.js'
import { UnitsComponent } from './component/units.component.js'

const weatherComponent = new WeatherComponent({
	outlet: document.querySelector('#weather-outlet'),
	template: document.querySelector('#weather-outlet > template')
});

const forecastComponent = new ForecastComponent({
	outlet: document.querySelector('#forecast-outlet'),
	template: document.querySelector('#forecast-outlet > template')
});

const history = new ListComponent({
	outlet: document.querySelector('#history-outlet'),
	template: document.querySelector('#history-outlet > template'),
	localStorageKey: 'history',
	clearButton: document.querySelector('#clear-history')
});
history.init();

const favourites = new ListComponent({
	outlet: document.querySelector('#favourites-outlet'),
	template: document.querySelector('#favourites-outlet > template'),
	localStorageKey: 'favourites',
	clearButton: document.querySelector('#clear-favourites'),
});
favourites.init();

export const units = new UnitsComponent({
	localStorageKey: 'units',
	toggleButton: document.querySelector('#swap-units-button')
});
units.init();

const WEATHER_APP = new Weather();
const update = (city) => {
	return WEATHER_APP.init(city)
		.then(() => {
			weatherComponent.init(WEATHER_APP.responseWeather);
			forecastComponent.init(WEATHER_APP.responseForecast);
		});
}

update();

document.addEventListener('needUpdate', (event) => {
	update(event.detail.city);
});

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

const addButton = document.querySelector('#add-button');
addButton.onclick = () => {
	favourites.add(WEATHER_APP.city);
}
