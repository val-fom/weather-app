import { Component } from '../component.js'

export class WeatherComponent extends Component {
	constructor(conf) {
		super()
		this.outlet = conf.outlet;
		this._template = conf.template;
	}

	init(response) {
		// console.log("WeatherComponent", "Init");
		this.outlet.innerHTML = '';
		const node = document.importNode(this._template.content, true);
		const icons = this._getIcons(response.weather);

		const city = node.querySelector('[class$="city"]');
		city.textContent = `${response.name},${response.sys.country}`;

		const icon = node.querySelector('[class$="icon"]');
		icon.insertAdjacentHTML('beforeend', icons);

		const temp = node.querySelector('[class$="temp"]');
		temp.textContent = `${response.main.temp.toFixed(0)}\xB0`;

		this.outlet.appendChild(node);
	}
}
