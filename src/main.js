import { Weather } from './weather.js'
import { WeatherComponent } from './component/weather.component.js'
import { ForecastComponent } from './component/forecast.component.js'
import { ListComponent } from './component/list.component.js'

const WEATHER_APP = new Weather();

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

WEATHER_APP.init()
	.then(() => {
		weatherComponent.init(WEATHER_APP.responseWeather);
		forecastComponent.init(WEATHER_APP.responseForecast);
	});

const form = document.querySelector('#search-form');
const input = form.querySelector('input');
form.onsubmit = () => {
	WEATHER_APP.init(form.elements.cityName.value)
		.then(() => {
			weatherComponent.init(WEATHER_APP.responseWeather);
			forecastComponent.init(WEATHER_APP.responseForecast);
			input.value = WEATHER_APP.city;
			history.add(WEATHER_APP.city);

		}, (error) => {
			input.style.background = '#ffd3d3';
			input.oninput = () => input.removeAttribute("style");
			console.error(error);
		});
	return false;
};

history.outlet.onclick = (event) => {
	if (event.target.tagName !== 'A') return;
	WEATHER_APP.init(event.target.innerHTML)
		.then(() => {
			weatherComponent.init(WEATHER_APP.responseWeather);
			forecastComponent.init(WEATHER_APP.responseForecast);
		});
}

favourites.outlet.onclick = (event) => {
	if (event.target.tagName !== 'A') return;
	WEATHER_APP.init(event.target.innerHTML)
		.then(() => {
			weatherComponent.init(WEATHER_APP.responseWeather);
			forecastComponent.init(WEATHER_APP.responseForecast);
		});
}

const addButton = document.querySelector('#add-button')
addButton.onclick = () => {
	favourites.add(WEATHER_APP.city)
}

const swapUnitsButton = document.querySelector('#swap-units-button');
swapUnitsButton.onclick = () => {
	WEATHER_APP.swapUnits();
	WEATHER_APP.toggleUnits(swapUnitsButton);
	WEATHER_APP.init()
		.then(() => {
			weatherComponent.init(WEATHER_APP.responseWeather);
			forecastComponent.init(WEATHER_APP.responseForecast);
		});
}

console.log(WEATHER_APP);
console.log(weatherComponent);
console.log(forecastComponent);
console.log(history);
console.log(favourites);
