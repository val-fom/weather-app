'use strict';

class WeatherApp {
	constructor() {
		this.key = '40c8d4e755a53b1d45a970fc3769eeeb'; // secret key)
		this.apiURL = 'https://api.openweathermap.org/data/2.5/weather';

		this.units = (() => {
					return (localStorage.units) ? localStorage.units : 'metric'; //default
				})();

		this.city = null;
		this.response = null;

		this.searchForm = document.querySelector('#search-form');
		this.searchList = document.querySelector('#search-list');
		this.favouriteList = document.querySelector('#favourite-list');
		this.weatherWrapper = document.querySelector('.weather-wrapper');
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
			self.updateUrl();
			self.addCityTitle();
			self.populateSearchList();
			self.drawWeather(self.response);
			self.toggleUnits();
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

	drawWeather(response) {
		let windSpeedUnit = ( () => { return (this.units === 'metric') ? 'm/s' : 'mi/h' ;})();
		this.weatherWrapper.querySelector('.weather-wrapper-city').innerHTML = `${response.name}`;
		this.weatherWrapper.querySelector('.weather-wrapper-temp').innerHTML = `${response.main.temp.toFixed(1)}&deg;`;
		this.weatherWrapper.querySelector('.weather-wrapper-list').innerHTML = `
				<li>temp(max): ${response.main.temp_max}&deg;</li>
				<li>temp(min): ${response.main.temp_min}&deg;</li>
				<li>wind: <span class="wind-direction"></span>${response.wind.speed.toFixed(1)} ${windSpeedUnit}</li>
				<li>humidity: ${response.main.humidity}\%</li>
				<li>pressure: ${Math.round(response.main.pressure)} hPa</li>
		`;
		let timeOfDay = '';
		if (response.weather[0].icon.endsWith('n')) timeOfDay = '-night';
		this.weatherWrapper.querySelector('.weather-wrapper-icon').innerHTML = `
			<i class="wi wi-owm${timeOfDay}-${response.weather[0].id}" alt="${response.weather[0].description}"></i>
		`;
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
