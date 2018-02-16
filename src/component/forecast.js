import { Component } from '../component.js'

export class Forecast extends Component {
	constructor(conf) {
		super();
		this._outlet = conf.outlet;
		this._template = conf.template;
	}

	init(response) {
		this._outlet.innerHTML = '';
		const node = document.importNode(this._template.content, true);
		for (var i = 0; i < response.list.length; i++) {
			const hours = this._getHours(response.list[i].dt);
			const icons = this._getIcons(response.list[i].weather);
			const threeHourForecast = node.cloneNode(true);

			const time = threeHourForecast.querySelector('.time');
			time.textContent = `${hours}`;

			const icon = threeHourForecast.querySelector('.icon');
			icon.insertAdjacentHTML('beforeend', icons);

			const temp = threeHourForecast.querySelector('.temp');
			temp.textContent = `${response.list[i].main.temp.toFixed(0)}\xB0`;

			this._outlet.appendChild(threeHourForecast);
		}
	}

	_getHours(dt) {
		const date = new Date(dt * 1000);
		return date.getHours().toString().padStart(2, '0');
	}
}
