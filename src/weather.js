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

	init() {
		this._getCityFromUrl();
		return this.getWeather('weather').then(() => {
			this._updateUrl();
			this._setCityTitle()
			console.log(this);
		}).catch(error => {
			console.error(error);
		});
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

	_getCityFromUrl() {
		let url = new URL(window.location.href);
		if (url.search.startsWith('?q=')) {
			this.config.city = url.search.slice(3);
		}
	}

	_updateUrl() {
		window.history.pushState(null, null, `?q=${this.config.city}`);
	}

	_setCityTitle() {
		let newTitle = `Weather App - ${this.config.city}`;
		if (document.title !== newTitle) document.title = newTitle;
	}

}
