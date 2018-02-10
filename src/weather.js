import { get } from './service/api.js'

export class Weather {
	constructor(city) {
		this.apiType = 'weather';
		this.units = 'metric'; //default
		this.city = 'kyiv'; //default
		this.responseWeather = null;
		this.responseForecast = null;
	}

	getWeather() {
		get(this.apiType, this.units, this.city)
			.then(data => {
				if (this.apiType === 'weather') {
					this.responseWeather = data;
				} else if (this.apiType === 'forecast') {
					this.responseForecast = data;
				}
			})
			.catch(error => {
				console.error(error);
			});
	}



}
