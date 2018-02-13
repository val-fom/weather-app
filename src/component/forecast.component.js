import { Component } from '../component.js'
import { WEATHER_APP } from '../main.js'

export class ForecastComponent extends Component {
	constructor() {
		super()
	}

	init() {
		console.log("ForecastComponent", "Init");
		const response = WEATHER_APP.responseForecast;
		const node = document.querySelector('#forecast-outlet');
		node.innerHTML = '';
		let html = '';
		for (var i = 0; i < response.list.length; i++) {
			const hours = this._getHours(response.list[i].dt);
			const icons = this._getIcons(response.list[i].weather);
			html += `
				<div class="forecast-list-three-hour">
					<div class="time">${hours}</div>
					<div class="icon">${icons}</div>
					<div class="temp">` + 
						`${response.list[i].main.temp.toFixed(0)}</div>
				</div>
			`;
		}
		node.insertAdjacentHTML('beforeend', html);
	}

	_getHours(dt) {
		const date = new Date(dt * 1000);
		return date.getHours().toString().padStart(2, '0');
	}


}
