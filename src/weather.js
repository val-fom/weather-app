import { get } from './service/api.js'

export class Weather {
	constructor(city) {
		this.config = {
			apiType: 'weather',
			units: 'metric', //default
			city: 'kyiv' //default
		}
		this.responseWeather = {};
		this.responseForecast = {};
	}

	getWeather() {
		let conf = this.config;
		return get(conf.apiType, conf.units, conf.city)
			.then(data => {
				if (conf.apiType === 'weather') {
					this.responseWeather = data;
				} else if (conf.apiType === 'forecast') {
					this.responseForecast = data;
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

}
