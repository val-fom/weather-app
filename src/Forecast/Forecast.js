require('./Forecast.scss');
import getIcons from '../utils/icons';

export default class Forecast {
	constructor() {
		this.state = {
			response: null
		}
		this.host = document.createElement('div');
		this.host.classList.add('forecast__container');
		this.forecast = document.createElement('div');
		this.forecast.classList.add('forecast');
		this.host.appendChild(this.forecast);
	}
	render() {
		if (!this.state.response) return this.host;
		this.forecast.innerHTML = '';
		for (var i = this.state.response.list.length - 1; i >= 0; i--) {
			const hours = this._getHours(this.state.response.list[i].dt);
			const icons = getIcons(this.state.response.list[i].weather);
			const html = `
				<article class="forecast__three-hour">
					<h4 class="forecast__time" data-time>${hours}</h4>
					<div class="forecast__icon" data-icon>${icons}</div>
					<div class="forecast__temp" data-temp>${this.state.response.list[i].main.temp.toFixed(0)}\xB0</div>
				</article>
			`;
			this.forecast.insertAdjacentHTML('beforeend', html);
		}
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

	_getHours(dt) {
		const date = new Date(dt * 1000);
		return date.getHours().toString().padStart(2, '0');
	}
}