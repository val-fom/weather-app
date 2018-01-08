'use strict';

class WeatherApp {
	constructor() {
		this.key = '40c8d4e755a53b1d45a970fc3769eeeb';
		this.apiURL = 'https://api.openweathermap.org/data/2.5/weather';

		this.units = 'metric';

		this.city = null;
		this.response = null;

		this.form = document.forms['searchForm'];

		this.url = new URL(window.location.href);

	}

	getCityFromUrl() {
		if (this.url.search.startsWith('?q=')) {
			this.city = this.url.search.slice(3);
			this.sendXhr();
		}
	}

	init() {
		this.getCityFromUrl();

		let self = this;
		this.form.onsubmit = () => {
			this.city = this.form.elements.city.value;
			self.sendXhr();
			return false;
		}
	}

	pushUrl() {
		let self = this;
		window.history.pushState( null, null, `?q=${this.city}`);
	}

	sendXhr() {
		let self = this;
		let xhr = new XMLHttpRequest();

		xhr.open('GET', `${this.apiURL}?q=${this.city}&APPID=${this.key}&units=${this.units}`);
		xhr.onreadystatechange = function() {
			if (this.readyState != 4) return;

			if (this.status != 200) {
				alert( 'error: ' + (this.status ? this.statusText : 'request failed') );
				return;
			}

			let response = this.responseText;
			self.response = JSON.parse(response);

			self.city = self.response.name;
			self.pushUrl();
		};
		xhr.send();
		console.log(this);
	}

}

let weatherApp = new WeatherApp();
weatherApp.init();


