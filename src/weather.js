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

	init(city) {
		this._getCityFromUrl();
		return this.getWeather('weather', city)
			.then(() => this.getWeather('forecast'))
	}

	getWeather(apiType, city) {
		let conf = this.config;
		if (!city) city = conf.city;
		return get(apiType, conf.units, city)
			.then(data => {
				if (apiType === 'weather') {
					this.responseWeather = data;
					this._setCityConfig();
					this._updateUrl();
					this._setCityTitle();
				} else if (apiType === 'forecast') {
					this.responseForecast = data;
				}
			})
	}

	_getCityFromUrl() {
		let url = new URL(window.location.href);
		if (url.search.startsWith('?q=')) {
			this.config.city = url.search.slice(3);
		}
	}

	_updateUrl() {
		window.history.pushState(null, null,
			`?q=${this.config.city}`);
	}

	_setCityConfig() {
		this.config.city = this.responseWeather.name +
			',' + this.responseWeather.sys.country;
	}

	_setCityTitle() {
		let newTitle = `Weather App - ${this.config.city}`;
		if (document.title !== newTitle) document.title = newTitle;
	}

}
