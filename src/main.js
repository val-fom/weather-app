import { Weather } from './weather.js'
import { WeatherComponent } from './component/weather.component.js'
import { ForecastComponent } from './component/forecast.component.js'
import { HistoryComponent } from './component/history.component.js'

export const WEATHER_APP = new Weather();
const weatherComponent = new WeatherComponent();
const forecastComponent = new ForecastComponent();

const history = new HistoryComponent({
	outlet: document.querySelector('#history-outlet'),
	template: document.querySelector('#history-outlet > template'),
	localStorageKey: 'history',
	clearButton: document.querySelector('#clear-history')
});
history.init();

// WEATHER_APP.init().then(() => {
// 	weatherComponent.init();
// });

// WEATHER_APP.getWeather('forecast').then(() => {
// 	forecastComponent.init();
// })

/*put into separate component*/
const form = document.querySelector('#search-form');
const input = form.querySelector('input');
form.onsubmit = () => {
	WEATHER_APP.getWeather('weather', form.elements.cityName.value)
		.then(() => {
			weatherComponent.init();
			input.value = WEATHER_APP.config.city;
			history.add(WEATHER_APP.config.city);
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

history.outlet.onclick = (event) => {
	WEATHER_APP.getWeather('weather', event.target.innerHTML)
		.then(() => {
			weatherComponent.init()
		})
		.then(() => {
			WEATHER_APP.getWeather('forecast')
				.then(() => {
					forecastComponent.init();
				})
		})
}
/*---------*/
