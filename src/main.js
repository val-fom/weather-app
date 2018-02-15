import { Weather } from './weather.js'
import { WeatherComponent } from './component/weather.component.js'
import { ForecastComponent } from './component/forecast.component.js'
import { ListComponent } from './component/list.component.js'

export const WEATHER_APP = new Weather();
const weatherComponent = new WeatherComponent();
const forecastComponent = new ForecastComponent();

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
		weatherComponent.init();
		forecastComponent.init();
	});

const form = document.querySelector('#search-form');
const input = form.querySelector('input');
form.onsubmit = () => {
	WEATHER_APP.init(form.elements.cityName.value)
		.then(() => {
			weatherComponent.init();
			forecastComponent.init();
			input.value = WEATHER_APP.config.city;
			history.add(WEATHER_APP.config.city);

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
		weatherComponent.init();
		forecastComponent.init();
	});
}

favourites.outlet.onclick = (event) => {
	if (event.target.tagName !== 'A') return;
	WEATHER_APP.init(event.target.innerHTML)
	.then(() => {
		weatherComponent.init();
		forecastComponent.init();
	});
}

const addButton = document.querySelector('#add-button')
addButton.onclick = (event) => {
	favourites.add(WEATHER_APP.config.city)
}
