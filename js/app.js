'use strict';

class WeatherApp {
	constructor() {
		this.key = '40c8d4e755a53b1d45a970fc3769eeeb'; // secret key)
		this.apiURL = 'https://api.openweathermap.org/data/2.5/weather';

		this.units = 'metric'; // default

		this.city = null;
		this.response = null;

		this.form = document.forms['searchForm'];

		this.searchHistory = [];
		this.favouriteCities = [];

	}

	getCityFromUrl() {
		let url = new URL(window.location.href);
		if (url.search.startsWith('?q=')) {
			this.city = url.search.slice(3);
		}
	}

	// Search History
	addCityToSearchHistory(city) {
		let searchHistory = this.searchHistory;
		if (searchHistory.includes(city)) return;
		searchHistory.push(city);
		localStorage.searchHistory = JSON.stringify(searchHistory);
	}

	getSearchHistory() {
		if (!localStorage.searchHistory) return;
		this.searchHistory = JSON.parse(localStorage.searchHistory);
	}

	// Favourite Cities
	addCityToFavouriteCities(city) {
		let favouriteCities = this.favouriteCities;
		if (favouriteCities.includes(city)) return;
		favouriteCities.push(city);
		localStorage.favouriteCities = JSON.stringify(favouriteCities);
	}

	getFavouriteCities() {
		if (!localStorage.favouriteCities) return;
		this.favouriteCities = JSON.parse(localStorage.favouriteCities);
	}

	addFormSubmitListener(form) {
		form.onsubmit = () => {
			this.city = this.form.elements.cityName.value;
			this.getWeather();
			return false;
		}
	}

	init() {
		this.getCityFromUrl();
		if (this.city) this.getWeather();
		this.getSearchHistory();
		this.getFavouriteCities();
		this.addFormSubmitListener(this.form);
	}

	updateUrl(city) {
		window.history.pushState( null, null, `?q=${this.city}`);
	}

	getWeather() {
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
			self.addCityToSearchHistory(self.city);
			self.updateUrl(self.city);
		};
		xhr.send();
		console.log(this);
	}

}

let weatherApp = new WeatherApp();
weatherApp.init();


