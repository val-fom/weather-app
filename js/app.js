'use strict';

class WeatherApp {
	constructor() {
		this.key = '40c8d4e755a53b1d45a970fc3769eeeb'; // secret key)
		this.apiURL = 'https://api.openweathermap.org/data/2.5/weather';

		this.units = 'metric'; // default

		this.city = null;
		this.response = null;

		this.form = document.querySelector('#searchForm');
		this.searchList = document.querySelector('#searchList');
		this.favouriteList = document.querySelector('#favouriteList');

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

	addFormSubmitHandler(form, handler) {
		form.onsubmit = () => {
			this.city = form.elements.cityName.value;
			handler.call(this);
			return false;
		}
	}

	init() {
		this.getCityFromUrl();
		if (this.city) this.getWeather();
		this.getSearchHistory();
		this.getFavouriteCities();
		this.addFormSubmitHandler(this.form, this.getWeather);
		this.populateSearchList();
		this.populateFavouriteList();
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
			self.populateSearchList();
		};
		xhr.send();
		console.log(this);
	}

	populateSearchList() {
		// clear list
		this.searchList.innerHTML = '';
		// add cities from searchHistory
		for (var i = this.searchHistory.length - 1; i >= 0; i--) {
			let cityName = this.searchHistory[i];
			let cityLi = document.createElement( 'li' );
			cityLi.innerHTML = `<a href="?q=${cityName}">${cityName}</a>`;
			this.searchList.appendChild( cityLi );
		}
	}

	populateFavouriteList() {
		this.favouriteCities.forEach( (cityName) => {
			let cityLi = document.createElement( 'li' );
			cityLi.innerHTML = cityName;
			this.searchList.appendChild( cityLi );
		});
	}

}

let weatherApp = new WeatherApp();
weatherApp.init();


