import getAll from './utils/api'
import { _getCityFromUrl } from './utils/index'
import Header from './Header/Header'
import Search from './Search/Search'
import History from './History/History'
import Favourites from './Favourites/Favourites'
import Weather from './Weather/Weather'
import Forecast from './Forecast/Forecast'
import Units from './Units/Units'

export default class App {
	constructor(host) {
		this.state = {
			weather: null,
			forecast: null,
			city: _getCityFromUrl() || 'kyiv',
			units: null,
		}
		this.host = host;
		this.handleUpdateRequest = this.handleUpdateRequest.bind(this);
		this.host.addEventListener('requestUpdate', this.handleUpdateRequest);

		this.header = new Header();
		this.search = new Search({
			city: 'Kyiv',
			onSubmit: this.onSearchSubmit,
		});
		this.onSearchSubmit = this.onSearchSubmit.bind(this);

		this.history = new History();
		this.favourites = new Favourites();
		this.weather = new Weather();
		this.forecast = new Forecast();
		this.units = new Units();
	}

	onSearchSubmit(city) {
		this.updateState({ city });
	}

	handleUpdateRequest(ev) {
		if (ev.detail.city) this.updateState({ city: ev.detail.city })
		if (ev.detail.units) this.updateState({ units: ev.detail.units })
		console.log(this.state);
		const city = ev.detail.city || this.state.city;
		const units = ev.detail.units || this.state.units;
		const response = getAll(city, units)
			.then(res => {
				this.updateState({
					weather: res[0],
					forecast: res[1],
					city: `${res[0].name},${res[0].sys.country}`,
					units: units
				});
				this.search.setCity({ city: this.state.city });
				this.history.setCity({ city: this.state.city });
				this.favourites.setCity({ city: this.state.city });
				this.weather.setResponse({ response: this.state.weather });
				this.forecast.setResponse({ response: this.state.forecast });
			});
	}

	updateState(nextState) {
		this.state = { ...this.state, ...nextState };
		// this.render();
		console.log(this.constructor.name + ': state updated', this.state);
		return this.host;
	}

	render() {
		const { city } = this.state;
		this.host.innerHTML = '';
		this.host.appendChild(
			this.search.update({
				city,
				onSubmit: this.onSearchSubmit
			})
		);

		const header = this.header.render();
		this.host.appendChild(header);
		const search = this.search.render();
		this.host.appendChild(search);
		const history = this.history.render();
		this.host.appendChild(history);
		const favourites = this.favourites.render();
		this.host.appendChild(favourites);
		const weather = this.weather.render();
		this.host.appendChild(weather);
		const forecast = this.forecast.render();
		this.host.appendChild(forecast);
		const units = this.units.render();
		this.host.appendChild(units);
		console.log('App.render()', 'this.state:', this.state);
	}
}
