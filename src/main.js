import { Weather } from './weather.js'
import { WeatherComponent } from './component/weather.component.js'
import { ForecastComponent } from './component/forecast.component.js'
import { HistoryComponent } from './component/history.component.js'

export const WEATHER_APP = new Weather();

const weatherComponent = new WeatherComponent();
const forecastComponent = new ForecastComponent();

const history = new HistoryComponent({
	data: WEATHER_APP.searchHistory,
	outlet: document.querySelector('#history-outlet'),
	template: document.querySelector('#history-outlet > template'),
	localStorageKey: 'history',
	clearButton: document.querySelector('#clear-history')
});
history.get();

WEATHER_APP.init().then(() => {
	weatherComponent.init(WEATHER_APP.responseWeather);
});

WEATHER_APP.getWeather('forecast').then(() => {
	forecastComponent.init();
})

/*put into separate component*/
const form = document.querySelector('#search-form');
const input = form.querySelector('input');
form.onsubmit = () => {
	WEATHER_APP.getWeather('weather', form.elements.cityName.value)
		.then(() => {
			weatherComponent.init(WEATHER_APP.responseWeather);
			input.value = WEATHER_APP.config.city;
			history.add(WEATHER_APP.config.city);
			console.log(WEATHER_APP);
		}, (error) => {
			input.style.background = '#ffd3d3';
			input.oninput = () => input.removeAttribute("style");
			console.error(error);
		})
	WEATHER_APP.getWeather('forecast')
		.then(() => {
			forecastComponent.init();
		});
	return false;
};
/*---------*/
