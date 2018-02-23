require('./Weather.scss')
import getIcons from '../utils/icons';

export default class Weather {
	constructor() {
		this.state = {
			response: null
		}
		this.host = document.createElement('div');
		this.host.classList.add('weather__container');
	}

	render() {
		if (!this.state.response) return this.host;
		const icons = getIcons(this.state.response.weather);
		this.host.innerHTML = '';
		const html = `
		<div class="weather">
			<h2 class="weather__city">${this.state.response.name},${this.state.response.sys.country}</h2>
			<div class="weather__icon">${icons}</div>
			<div class="weather__temp">${this.state.response.main.temp.toFixed(0)}\xB0</div>
		</div>
		`;
		this.host.insertAdjacentHTML('beforeend', html);
		return this.host;
	}

	setResponse(props) {
		this.updateState({ response: props.response });
	}

	updateState(nextState) {
		this.state = { ...this.state, ...nextState };
		this.render();
		console.log(this.constructor.name + ': state updated', this.state);
	}
}
