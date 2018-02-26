require('./Units.scss')

export default class Units {
	constructor(conf) {
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
		this.button.textContent = (this.state.units === 'metric') ? '\xB0C' : '\xB0F';
		return this.host;
	}

	updateState(nextState) {
		this.state = { ...this.state, ...nextState };
		this.render();
		console.log(this.constructor.name + ': state updated', this.state);
	}

	toggle() {
		const units = (this.state.units === 'metric') ? 'imperial' : 'metric';
		localStorage.units = units;
		this.updateState({ units });
		this.dispatchRequestUpdateEvent({ units })
	}

	dispatchRequestUpdateEvent(detail) {
		const event = new CustomEvent('requestUpdate', {
			bubbles: true,
			detail: detail
		});
		this.host.dispatchEvent(event);
	}
}
