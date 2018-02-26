import getAll from './utils/api'
import { _getCityFromUrl } from './utils/index'

import Component from './Component'

import Header from './Header/Header'
import Search from './Search/Search'
import History from './History/History'
import Favourites from './Favourites/Favourites'
import Weather from './Weather/Weather'
import Forecast from './Forecast/Forecast'
import Units from './Units/Units'

export default class App extends Component {
	constructor(host) {
		super();

		this.state = {
			weatherResponse: null,
			forecastResponse: null,
			city: _getCityFromUrl() || 'kyiv',
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
	}

	onSearchSubmit(city = this.state.city) {
		getAll(city, this.state.units)
			.then(res => {
				this.updateState({
					weatherResponse: res[0],
					forecastResponse: res[1],
					city: `${res[0].name},${res[0].sys.country}`,
				});
			});
	}

	onUnitsToggle(units) {
		this.updateState({
			units,
		})
		this.onSearchSubmit();
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
		]
	}
}
