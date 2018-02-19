require('./Search.scss')

export default class Search {
	constructor() {
		this.state = {
			isValid: true
		};

		this.host = document.createElement('div');
		this.host.classList.add('search__container');
		this.host.dataset.search;

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);

		this.host.addEventListener('submit', this.handleSubmit);
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		this.render();
		console.log('state updated', this.state);
	}

	handleSubmit(ev) {
		ev.preventDefault();
		const city = ev.target.elements.search.value.trim();
		if (!city.length) {
			this.host.addEventListener('input', this.handleInput);
			this.updateState({ isValid: false });
			this.stayFocused();
		}
	}

	handleInput() {
		this.host.removeEventListener('input', this.handleInput);
		this.updateState({ isValid: true });
		this.stayFocused();
	}

	stayFocused() {
		const input = this.host.querySelector('input');
		input.focus();
	}

	render() {
		const { isValid } = this.state;
		const form = `
			<form class="search" data-search>
				<input required class="search__input" name="search"
					data-is-valid = ${isValid}
					placeholder="type city name and press enter">
			</form>
		`;
		this.host.innerHTML = '';
		this.host.insertAdjacentHTML('beforeend', form);
		return this.host;
	}
}
