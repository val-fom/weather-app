require('./src/scss/app.scss');

import getAll from './src/utils/api';
import findCity from './src/utils/api';
import { getCityFromUrl, setCityTitle, pushHistoryState } from './src/utils';

import { Component } from './src/Framework';

import Header from './src/Header';
import Search from './src/Search';
import History from './src/History';
import Favourites from './src/Favourites';
import Weather from './src/Weather';
import Forecast from './src/Forecast';
import Units from './src/Units';
import Footer from './src/Footer';

export default class App extends Component {
	constructor({ host }) {
		super();

		this.state = {
			weatherResponse: null,
			forecastResponse: null,
			city: getCityFromUrl() || 'Kyiv,UA',
			units: localStorage.units || 'metric',
			isFound: true,
		}

		this.host = host;

		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onUnitsToggle = this.onUnitsToggle.bind(this);
		this.onPopHistoryState = this.onPopHistoryState.bind(this);

		this.header = new Header();
		this.search = new Search({
			city: this.state.city,
			onSubmit: this.onSearchSubmit,
			isFound: true,
		});
		this.history = new History({
			city: this.state.city,
			onClick: this.onSearchSubmit,
		});
		this.favourites = new Favourites({
			city: this.state.city,
			onClick: this.onSearchSubmit,
		});
		this.weather = new Weather();
		this.forecast = new Forecast();
		this.units = new Units({
			onToggle: this.onUnitsToggle,
		});
		this.footer = new Footer();

		window.onpopstate = ev => {
			if (ev.state) {
				this.onPopHistoryState(ev.state.city, ev.state.units);
			}
		}

		this.onSearchSubmit();
	}

	onSearchSubmit(city) {
		this.udateCityResponse(city)
			.then(({ city, units }) => pushHistoryState({ city, units }))
			.catch(console.error);
	}

	onUnitsToggle(units) {
		this.udateCityResponse(undefined, units)
			.then(({ city, units }) => pushHistoryState({ city, units }));
	}

	onPopHistoryState(city, units) {
		this.udateCityResponse(city, units);
	}

	udateCityResponse(city = this.state.city, units = this.state.units) {
		return getAll(city, units)
			.then(this.computeNextState, this.computeNotFoundState)
			.then(this.updateState)
			.catch(console.error);
	}

	computeNextState( [weatherResponse, forecastResponse, units] ) {
		const city = `${weatherResponse.name},${weatherResponse.sys.country}`;
		return {
			weatherResponse,
			forecastResponse,
			units,
			city,
			isFound: true
		}
	}

	computeNotFoundState() {
		console.error('App.state.isFound: false');
		return { isFound: false };
	}

	render() {
		const { city, weatherResponse, forecastResponse, isFound } = this.state;

		setCityTitle(city);

		return [
			this.header.update(),
			this.search.update({ city, isFound }),
			this.history.update({ city }),
			this.favourites.update({ city }),
			this.weather.update({ city, weatherResponse }),
			this.forecast.update({ city, forecastResponse }),
			this.units.update(),
			this.footer.update(),
		];
	}
}
