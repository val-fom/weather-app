import { Weather } from './weather.js'
import { WeatherComponent } from './component/weather.component.js'
import { ForecastComponent } from './component/forecast.component.js'

export const WEATHER_APP = new Weather();

const weatherComponent = new WeatherComponent();
const forecastComponent = new ForecastComponent();

WEATHER_APP.getWeather('weather').then(() => {
	weatherComponent.init();
})
WEATHER_APP.getWeather('forecast').then(() => {
	forecastComponent.init();
})
