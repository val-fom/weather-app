import { Weather } from './weather.js'
import { WeatherComponent } from './component/weather.component.js'
import { ForecastComponent } from './component/forecast.component.js'

export const WEATHER_APP = new Weather();

const weatherComponent = new WeatherComponent();
const forecastComponent = new ForecastComponent();

WEATHER_APP.init().then(() => {
	weatherComponent.init();
});

WEATHER_APP.getWeather('forecast').then(() => {
	forecastComponent.init();
})

const form = document.querySelector('#search-form');
const input = form.querySelector('input');
form.onsubmit = (e) => {
	WEATHER_APP.config.city = form.elements.cityName.value;
	WEATHER_APP.getWeather('weather').then(() => {
		weatherComponent.init();
		input.value = WEATHER_APP.config.city;
	})
	WEATHER_APP.getWeather('forecast').then(() => {
		forecastComponent.init();
	})
	return false;
};
