import getAll from './utils/api'
import Header from './Header/Header'
import Search from './Search/Search'
import History from './History/History'
import Favourites from './Favourites/Favourites'
import Weather from './Weather/Weather'

export default class App {
	constructor(host) {
		this.state = {
			weather: null,
			forecast: null,
			city: null
		}
		this.host = host;
		this.handleSearch = this.handleSearch.bind(this);
		this.host.addEventListener('search', this.handleSearch);

		this.header = new Header();
		this.search = new Search();
		this.history = new History();
		this.favourites = new Favourites();
		this.weather = new Weather();
	}

	handleSearch(ev) {
		const city = ev.detail.city;
		const response = getAll(city)
			.then(res => {
				this.updateState({ 
					weather: res[0],
					forecast: res[1],
					city: `${res[0].name},${res[0].sys.country}`
				});
				this.search.setCity({ city: this.state.city });
				this.history.setCity({ city: this.state.city });
				this.favourites.setCity({ city: this.state.city });
				this.weather.setResponse({ response: this.state.weather });
			});
	}

	updateState(nextState) {
		this.state = { ...this.state, ...nextState };
		// this.render();
		console.log(this.constructor.name + ': state updated', this.state);
	}

	render() {
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
	}
}
