require('./Weather.scss')
import getIcons from '../utils/icons';

export default class Weather {
	constructor(props) {
		this.props = props || {};
		this.state = {};
		this.host = document.createElement('div');
		this.host.classList.add('weather__container');
	}

	render() {
		if (!this.props.weatherResponse) return this.host;
		const icons = getIcons(this.props.weatherResponse.weather);
		this.host.innerHTML = '';
		const html = `
		<div class="weather">
			<h2 class="weather__city">${this.props.weatherResponse.name},${this.props.weatherResponse.sys.country}</h2>
			<div class="weather__icon">${icons}</div>
			<div class="weather__temp">${this.props.weatherResponse.main.temp.toFixed(0)}\xB0</div>
		</div>
		`;
		this.host.insertAdjacentHTML('beforeend', html);
		return this.host;
	}

	updateState(nextState) {
		this.state = { ...this.state, ...nextState };
		this.render();
		console.log(this.constructor.name + ': state updated', this.state);
	}

	update(nextProps) {
		this.props = { ...this.props, ...nextProps };
		console.log(this.constructor.name + ': _props_ updated', this.props);
		return this.render();
	}
}
