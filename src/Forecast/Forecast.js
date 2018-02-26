require('./Forecast.scss');

import Component from '../Component'

import getIcons from '../utils/icons';

export default class Forecast extends Component {
	constructor(props) {
		super(props);

		this.host = document.createElement('div');
		this.host.classList.add('forecast__container');
		this.forecast = document.createElement('div');
		this.forecast.classList.add('forecast');
		this.host.appendChild(this.forecast);
	}
	render() {
		if (!this.props.forecastResponse) return '';

		const { forecastResponse } = this.props;

		this.forecast.innerHTML = '';
		for (var i = forecastResponse.list.length - 1; i >= 0; i--) {
			const hours = this._getHours(forecastResponse.list[i].dt);
			const icons = getIcons(forecastResponse.list[i].weather);
			const html = `
				<article class="forecast__three-hour">
					<h4 class="forecast__time" data-time>${hours}</h4>
					<div class="forecast__icon" data-icon>${icons}</div>
					<div class="forecast__temp" data-temp>${forecastResponse.list[i].main.temp.toFixed(0)}\xB0</div>
				</article>
			`;
			this.forecast.insertAdjacentHTML('beforeend', html);
		}
		return this.forecast;
	}

	_getHours(dt) {
		const date = new Date(dt * 1000);
		return date.getHours().toString().padStart(2, '0');
	}
}
