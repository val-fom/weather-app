require('./Units.scss')

import Component from '../Component'

export default class Units extends Component {
	constructor(props) {
		super(props);

		this.state = {
			units: (localStorage.units || 'metric')
		}
		this.host = document.createElement('div');
		this.host.classList.add('units__container');

		this.button = document.createElement('button');
		this.button.classList.add('units__button');
		this.host.appendChild(this.button);

		this.toggle = this.toggle.bind(this);
		this.button.addEventListener('click', this.toggle);
	}

	render() {
		this.button.textContent = (this.state.units === 'metric') ?
			'\xB0C' : '\xB0F';
		return this.button;
	}

	toggle() {
		const units = (this.state.units === 'metric') ? 'imperial' : 'metric';
		localStorage.units = units;
		this.updateState({ units });
		this.props.onToggle(units);
	}
}
