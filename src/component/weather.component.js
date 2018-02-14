import { Component } from '../component.js'
import { WEATHER_APP } from '../main.js'

export class WeatherComponent extends Component {
	constructor() {
		super()
	}

	init() {
		// console.log("WeatherComponent", "Init");
		const response = WEATHER_APP.responseWeather;
		const node = document.querySelector('#weather-outlet');
		node.innerHTML = '';
		const icons = this._getIcons(response.weather);
		let html = `
			<h2 class="current-weather-city">${response.name},${response.sys.country}</h2>
			<div class="current-weather-icon">${icons}</div>
			<div class="current-weather-temp">` + 
				`${response.main.temp.toFixed(0)}&deg;</div>
		`;
		node.insertAdjacentHTML('beforeend', html);
	}


}
