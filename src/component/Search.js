require('./Search.scss')

export default class Search {
	constructor() {
		this.host = document.createElement('div');
		this.host.classList.add('search__container');
		this.host.dataset.search;
	}

	render() {
		this.host.innerHTML = `
			<form class="search" data-search>
				<input required class="search__input" name="search"
					placeholder="type city name and press enter">
			</form>
		`;
		return this.host;
	}
}
