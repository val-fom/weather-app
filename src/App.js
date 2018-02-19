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
		this.header = new Header();
		this.search = new Search();
		this.history = new History();
		this.favourites = new Favourites();
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
