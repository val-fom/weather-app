require('./Units.scss')

import { Component } from '../Framework'

export default class Units extends Component {
	constructor(props) {
		super(props);

		this.state = {
			units: (localStorage.units || 'metric')
		}
		this.host = document.createElement('div');
		this.host.classList.add('units__container');

		this.button = document.createElement('button');
		this.button.classList.add('units__button', 'button');
		this.host.appendChild(this.button);

		this.toggle = this.toggle.bind(this);
		this.button.addEventListener('click', this.toggle);
	}

	render() {
		this.button.innerHTML = (this.state.units === 'metric') ?
			'<span class="units__button--accent">\xB0C</span>/<span>\xB0F</span>' :
			'<span>\xB0C</span>/<span class="units__button--accent">\xB0F</span>'
		return this.button;
	}

	toggle() {
		const units = (this.state.units === 'metric') ? 'imperial' : 'metric';
		localStorage.units = units;
		this.updateState({ units });
		this.props.onToggle(units);
	}
}
