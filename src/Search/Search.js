require('./Search.scss')

export default class Search {
	constructor(props) {
		this.props = props || {};
		this.state = {
			isValid: true,
		};

		this.host = document.createElement('div');
		this.host.classList.add('search__container');
		this.host.dataset.search;

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);

		this.host.addEventListener('submit', this.handleSubmit);
	}

	updateState(nextState) {
		this.state = { ...this.state, ...nextState };
		this.render();
		console.log(this.constructor.name + ': _state_ updated', this.state);
	}

	update(nextProps) {
		this.props = { ...this.props, ...nextProps };
		console.log(this.constructor.name + ': _props_ updated', this.props);
		return this.render();
	}

	handleSubmit(ev) {
		ev.preventDefault();
		const city = ev.target.elements.search.value.trim();
		if (!city.length) {
			this.host.addEventListener('input', this.handleInput);
			this.updateState({ isValid: false });
			this.stayFocused();
		} else {
			this.props.onSubmit(city);
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
		const { city } = this.props;
		const form = `
			<form class="search" data-search>
				<input required class="search__input" name="search"
					data-is-valid = ${isValid}
					placeholder="type city name and press enter"
					value = "${city}">
			</form>
		`;
		this.host.innerHTML = '';
		this.host.insertAdjacentHTML('beforeend', form);
		return this.host;
	}
}
