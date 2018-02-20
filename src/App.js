import getAll from './utils/api'
import Header from './component/Header'
import Search from './component/Search'
import History from './component/History'
import Favourites from './component/Favourites'


export default class App {
	constructor(host) {
		this.state = {
			weather: null,
			forecast: null
		}
		this.host = host;
		this.handleSubmit = this.handleSubmit.bind(this);
		this.host.addEventListener('submit', this.handleSubmit);

		this.header = new Header();
		this.search = new Search();
		this.history = new History();
		this.favourites = new Favourites();
	}

	handleSubmit(ev) {
		const city = ev.target.elements.search.value.trim();
		if (this.search.state.isValid) {
			const response = getAll(city).then(console.log);
		}
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
