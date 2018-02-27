import { Component } from '../Framework'

require('./Search.scss')

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isValid: true,
		};

		this.host = document.createElement('div');
		this.host.classList.add('search__container');

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);

		this.host.addEventListener('submit', this.handleSubmit);
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

		return `
			<form class="search">
				<input required class="search__input" name="search"
					data-is-valid=${isValid}
					placeholder="type city name and press enter"
					value=${city}>
			</form>
		`;
	}
}
