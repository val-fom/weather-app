import { get } from './service/api.js'

export class Weather {
	constructor(city) {
		this.units = (localStorage.units || 'metric');
		this.city = (this._getCityFromUrl() || 'kyiv');
		this.responseWeather = null;
		this.responseForecast = null;
	}

	init(city) {
		return this._getWeather('weather', city)
			.then(() => this._getWeather('forecast'))
	}

	_getWeather(apiType, city) {
		if (!city) city = this.city;
		return get(apiType, this.units, city)
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
			return url.search.slice(3);
		}
	}

	_updateUrl() {
		window.history.pushState(null, null, `?q=${this.city}`);
	}

	_setCityConfig() {
		this.city = this.responseWeather.name +
			',' + this.responseWeather.sys.country;
	}

	_setCityTitle() {
		let newTitle = `Weather App - ${this.city}`;
		if (document.title !== newTitle) document.title = newTitle;
	}

}
