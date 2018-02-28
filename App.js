require('./src/app.scss');

import getAll from './src/utils/api';
import findCity from './src/utils/api';
import { getCityFromUrl, setCityTitle, updateUrl } from './src/utils';

import { Component } from './src/Framework';

import Header from './src/Header';
import Search from './src/Search';
import History from './src/History';
import Favourites from './src/Favourites';
import Weather from './src/Weather';
import Forecast from './src/Forecast';
import Units from './src/Units';

export default class App extends Component {
	constructor({ host }) {
		super();

		this.state = {
			weatherResponse: null,
			forecastResponse: null,
			city: getCityFromUrl() || 'Kyiv,UA',
			units: localStorage.units || 'metric',
		}

		this.host = host;

		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onUnitsToggle = this.onUnitsToggle.bind(this);

		this.header = new Header();
		this.search = new Search({
			city: this.state.city,
			onSubmit: this.onSearchSubmit,
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

		this.onSearchSubmit();
	}

	onFindCity(city) {
		findCity(city).then(list => {
			console.table(list);
		});
	}

	onSearchSubmit(city = this.state.city, units = this.state.units) {
		getAll(city, units)
			.then(([weatherResponse, forecastResponse, units]) => {
				const city = `${weatherResponse.name},` +
					`${weatherResponse.sys.country}`;
				this.updateState({
					weatherResponse,
					forecastResponse,
					units,
					city,
				});
				setCityTitle(city);
				updateUrl(city);
			});
	}

	onUnitsToggle(units) {
		this.onSearchSubmit(undefined, units);
	}

	render() {
		const { city, weatherResponse, forecastResponse } = this.state;

		return [
			this.header.update(),
			this.search.update({ city }),
			this.history.update({ city }),
			this.favourites.update({ city }),
			this.weather.update({ city, weatherResponse }),
			this.forecast.update({ city, forecastResponse }),
			this.units.update(),
		];
	}
}
