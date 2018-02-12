import { get } from './service/api.js'

export class Weather {
	constructor(city) {
		this.config = {
			units: 'metric', //default
			city: 'kyiv' //default
		}
		this.responseWeather = null;
		this.responseForecast = null;
	}

	getWeather(apiType) {
		let conf = this.config;
		return get(apiType, conf.units, conf.city)
			.then(data => {
				if (apiType === 'weather') {
					this.responseWeather = data;
				} else if (apiType === 'forecast') {
					this.responseForecast = data;
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

}
