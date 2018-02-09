import { get } from './service/api.service.js'

//
import { WEATHER_KYIV } from '../sample/weather_kyiv.js'
import { FORECAST_KYIV } from '../sample/forecast_kyiv.js'
//

export class Weather {
	constructor(city) {
		this.apiType = 'weather';
		this.units = 'metric'; //default
		this.city = 'kyiv'; //default
		this.responseWeather = null;
		this.responseForecast = null;
		// temp hardcoded data ******************
		this.responseWeather = WEATHER_KYIV; //
		this.responseForecast = FORECAST_KYIV; //
		//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	}

	getWeather() {
		// get(this.apiType, this.units, this.city)
		// 	.then(data => {
		// 		if (this.apiType === 'weather') {
		// 			this.responseWeather = data;
		// 		} else if (this.apiType === 'forecast') {
		// 			this.responseForecast = data;
		// 		}
		// 	})
		// 	.catch(error => {
		// 		console.error(error);
		// 	});
	}



}
