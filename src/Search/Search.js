import { Component } from '../Framework'

require('./Search.scss')

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isValid: true,
		};

		this.inputValue = null;

		this.host = document.createElement('div');
		this.host.classList.add('search__container');

		this.form = document.createElement('form');
		this.form.classList.add('search');

		this.input = document.createElement('input');
		this.input.classList.add('search__input');
		this.input.name = 'search';
		this.input.placeholder = 'type city name and press enter';

		this.input.addEventListener('mouseup', () =>
			this.input.setSelectionRange(0, 999));

		this.button = document.createElement('button');
		this.button.classList.add('button', 'search__button');
		this.button.title = 'search';
		this.button.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>'

		this.form.append(this.input, this.button);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.host.addEventListener('submit', this.handleSubmit);
	}

	handleSubmit(ev) {
		ev.preventDefault();
		const inputValue = ev.target.elements.search.value.trim();
		if (!inputValue) {
			this.updateState({ isValid: false });
		} else {
			this.updateState({ isValid: true });
			this.inputValue = inputValue;
			this.props.onSubmit(inputValue);
		}
	}

	render() {
		const { isFound } = this.props;
		let { isValid } = this.state;
		isValid = isValid && isFound;

		let { city } = this.props;
		if (!isFound) {
			city = `city \'${this.inputValue}\' not found`;
		}

		this.input.dataset.isValid = isValid;
		this.input.value = city;

		console.log(this.state, this.props);
		return this.form;
	}
}
