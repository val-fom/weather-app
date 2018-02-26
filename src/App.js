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

		this.header = new Header();
		this.search = new Search({
			city: this.state.city,
			onSubmit: this.onSearchSubmit,
		});

		this.history = new History();
		this.favourites = new Favourites();
		this.weather = new Weather();
		this.forecast = new Forecast();
		this.units = new Units();
	}

	onSearchSubmit(city) {
		getAll(city, this.state.units)
			.then(res => {
				this.updateState({
					weatherResponse: res[0],
					forecastResponse: res[1],
					city: `${res[0].name},${res[0].sys.country}`,
					// units: units
				});
			});
	}

	// handleUpdateRequest(ev) {
	// 	if (ev.detail.city) this.updateState({ city: ev.detail.city })
	// 	if (ev.detail.units) this.updateState({ units: ev.detail.units })
	// 	console.log(this.state);
	// 	const city = ev.detail.city || this.state.city;
	// 	const units = ev.detail.units || this.state.units;
	// 	const response = getAll(city, units)
	// 		.then(res => {
	// 			this.updateState({
	// 				weather: res[0],
	// 				forecast: res[1],
	// 				city: `${res[0].name},${res[0].sys.country}`,
	// 				units: units
	// 			});
	// 			this.search.setCity({ city: this.state.city });
	// 			this.history.setCity({ city: this.state.city });
	// 			this.favourites.setCity({ city: this.state.city });
	// 			this.weather.setResponse({ response: this.state.weather });
	// 			this.forecast.setResponse({ response: this.state.forecast });
	// 		});
	// }

	render() {
		const { city, weatherResponse, forecastResponse } = this.state;

		return [
			this.header.update(),
			this.search.update({ city }),
			this.weather.update({ city, weatherResponse }),
		]
	}
}
