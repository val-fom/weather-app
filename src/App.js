import getAll from './utils/api'
import Header from './component/Header'
import Search from './component/Search'
import History from './component/History'
import Favourites from './component/Favourites'

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
				this.history.add( this.state.city )
				this.search.updateState({ value: this.state.city });
			});
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		// this.render();
		console.log('App: state updated', this.state);
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
	}
}
