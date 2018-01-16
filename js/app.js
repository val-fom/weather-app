'use strict';

class WeatherApp {
	constructor() {
		this.key = '40c8d4e755a53b1d45a970fc3769eeeb'; // secret key)
		this.count = '&cnt=' + 8;
		this.apiURL = 'https://api.openweathermap.org/data/2.5/';

		this.units = (() => {
					return (localStorage.units) ? localStorage.units : 'metric'; //default
				})();

		this.city = null;
		this.response = null;
		this.responseForecast = null;

		this.searchForm = document.querySelector('#search-form');
		this.searchList = document.querySelector('#search-list');
		this.favouriteList = document.querySelector('#favourite-list');
		this.forecastWrapper = document.querySelector('.forecast-wrapper');
		this.clearHistoryButton = document.querySelector('#clear-history');
		this.clearFavouritesButton = document.querySelector('#clear-favourites');
		this.addFavouriteCityButton = document.querySelector('#add-button');
		this.swapUnitsButton = document.querySelector('#swap-units-button');

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
		let index = searchHistory.indexOf(city);
		if (index >= 0) {
			searchHistory.splice(index, 1);
		}
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
		if (favouriteCities.length === 4) {
			alert('Too many cities');
			return;
		}
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
		this.addFormSubmitHandler(this.searchForm, this.getWeather);
		this.populateSearchList();
		this.populateFavouriteList();
		this.clearHistoryButton.onclick = () => { this.clearHistory() };
		this.clearFavouritesButton.onclick = () => { this.clearFavourites() };
		this.addFavouriteCityButton.onclick = () => {
			this.addCityToFavouriteCities(this.city);
			this.populateFavouriteList();
		};
		this.swapUnitsButton.onclick = () => {
			this.swapUnits();
			this.getWeather();
		};

		let self = this;
		this.forecastWrapper.onclick = function() { 
			if (!self.responseForecast) self.getForecast();
			this.querySelector('.forecast-list').classList.toggle('show-forecast');
		};
	}

	updateUrl() {
		window.history.pushState( null, null, `?q=${this.city}`);
	}

	addCityTitle() {
		let newTitle = `Weather App - ${this.city}`;
		if (document.title !== newTitle) document.title = newTitle;
	}

	getWeather() {
		let self = this;
		let xhr = new XMLHttpRequest();
		xhr.open('GET', `${this.apiURL}weather?q=${this.city}&APPID=${this.key}&units=${this.units}${this.count}`);

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
			self.updateUrl();
			self.addCityTitle();
			self.populateSearchList();
			self.drawWeather(self.response);
			self.toggleUnits();
		};
		xhr.send();
		console.log(this);
	}

	getForecast() {
		let self = this;
		let xhr = new XMLHttpRequest();
		xhr.open('GET', `${this.apiURL}forecast?q=${this.city}&APPID=${this.key}&units=${this.units}${this.count}`);

		xhr.onreadystatechange = function() {
			if (this.readyState != 4) return;

			if (this.status != 200) {
				alert( 'error: ' + (this.status ? this.statusText : 'request failed') );
				return;
			}

			let response = this.responseText;
			self.responseForecast = JSON.parse(response);

			self.drawForecast(self.responseForecast);
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
		if (this.favouriteCities.length === 0) return;
		// clear list
		this.favouriteList.innerHTML = '';
		// add cities from favouriteCities
		for (var i = this.favouriteCities.length - 1; i >= 0; i--) {
			let cityName = this.favouriteCities[i];
			let cityLi = document.createElement( 'a' );
			cityLi.innerHTML = `${cityName}`;
			cityLi.href = `?q=${cityName}`;
			this.favouriteList.appendChild( cityLi );
		}
	}

	drawWeathericons(source, sink) {
		for (var i = source.length - 1; i >= 0; i--) {
			// source[i] /// weather
			let timeOfDay = ''; // to set -day or -night icon type
			if ( source[i].icon.endsWith('n') ) timeOfDay = '-night';
			if ( source[i].icon.endsWith('d') ) timeOfDay = '-day';
			let weatherIcon = document.createElement('i');
			weatherIcon.className = `wi wi-owm${timeOfDay}-${source[i].id}`;
			weatherIcon.title = `${source[i].main}: ${source[i].description}`;
			sink.appendChild(weatherIcon);
		}
	}

	drawWeather(response) {
		// current-weather
		this.forecastWrapper.querySelector('.current-weather-city').innerHTML = `${response.name}`;
		this.forecastWrapper.querySelector('.current-weather-temp').innerHTML = `${response.main.temp.toFixed(0)}&deg;`;
		this.forecastWrapper.querySelector('.current-weather-icon').innerHTML = '';

		let self = this;
		this.drawWeathericons(response.weather, self.forecastWrapper.querySelector('.current-weather-icon'));
	}

	drawForecast(response) {
// 		let windSpeedUnit = ( () => { return (this.units === 'metric') ? 'm/s' : 'mi/h' ;})();
		let forecastList = this.forecastWrapper.querySelector('.forecast-list');
		forecastList.innerHTML = '';
		for (var i = 0; i < response.list.length; i++) {
			let date = new Date(response.list[i].dt * 1000);
			let hours = date.getHours();
			if (hours < 10) hours = '0' + hours;
			let threeHourForecast = document.createElement('div');
			threeHourForecast.className = 'forecast-list-three-hour';
			threeHourForecast.innerHTML = `
				<div class="time">${hours}</div>
				<div class="icon"></div>
				<div class="temp">${response.list[i].main.temp.toFixed(0)}</div>
			`;
			this.drawWeathericons(response.list[i].weather, threeHourForecast.querySelector('.icon'));
			forecastList.appendChild(threeHourForecast);
		}
	}

	clearHistory() {
		this.searchHistory.length = 0;
		this.searchList.innerHTML = "";
		localStorage.searchHistory = "[]";
	}

	clearFavourites() {
		this.favouriteCities.length = 0;
		this.favouriteList.innerHTML = "<span>click + to add the city to your favorites</span>";
		localStorage.favouriteCities = "[]";
	}

	swapUnits() {
		if (this.units === 'metric') {
			this.units = 'imperial';
		} else {
			this.units = 'metric';
		}
		localStorage.units = this.units;
	}

	toggleUnits() {
		let unitsSymbols = this.swapUnitsButton.querySelectorAll('span');
		if (this.units === 'metric') {
			unitsSymbols[0].style.color = '#222';
			unitsSymbols[1].style.color = '#999';
		} else {
			unitsSymbols[1].style.color = '#222';
			unitsSymbols[0].style.color = '#999';
		}
	}
}

let weatherApp = new WeatherApp();
weatherApp.init();
