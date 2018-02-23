import { Component } from '../component.js'

export class Weather1 extends Component {
	constructor(conf) {
		super();
		this._outlet = conf.outlet;
		this._template = conf.template;
	}

	init(response) {
		// this._outlet.innerHTML = '';
		// const node = document.importNode(this._template.content, true);
		// const icons = this._getIcons(response.weather);

		// const city = node.querySelector('[data-city]');
		// city.textContent = `${response.name},${response.sys.country}`;

		// const icon = node.querySelector('[data-icon]');
		// icon.insertAdjacentHTML('beforeend', icons);

		// const temp = node.querySelector('[data-temp]');
		// temp.textContent = `${response.main.temp.toFixed(0)}\xB0`;

		// this._outlet.appendChild(node);
	}
}
