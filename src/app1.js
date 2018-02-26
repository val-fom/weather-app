import { get } from './utils/api'
import { units } from './main.js'

export class App1 {
	constructor(city) {
		this.city = (this._getCityFromUrl() || 'kyiv');
		this.responseWeather = null;
		this.responseForecast = null;
	}

	_updateUrl() {
		window.history.pushState(null, null, `?q=${this.city}`);
	}

	_setCityTitle() {
		let newTitle = `Weather App - ${this.city}`;
		if (document.title !== newTitle) document.title = newTitle;
	}
}
