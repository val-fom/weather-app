require('./Weather.scss')

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
		const icons = this._getIcons(this.state.response.weather);
		this.host.innerHTML = '';
		const weather = `
		<div class="weather">
			<h2 class="weather__city">${this.state.response.name},${this.state.response.sys.country}</h2>
			<div class="weather__icon">${icons}</div>
			<div class="weather__temp">${this.state.response.main.temp.toFixed(0)}\xB0</div>
		</div>
		`;
		this.host.insertAdjacentHTML('beforeend', weather);
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


	_getIcons(source) {
		let icons = '';
		for (var i = source.length - 1; i >= 0; i--) {
			let timeOfDay = '';
			if (source[i].id >= 800 && source[i].id <= 803) {
				if (source[i].icon.endsWith('n')) timeOfDay = '-night';
				if (source[i].icon.endsWith('d')) timeOfDay = '-day';
			}
			icons += `<i class="wi wi-owm${timeOfDay}-${source[i].id}"` +
				`title="${source[i].main}: ${source[i].description}"></i>`;
		}
		return icons;
	}
}
