export class UnitsComponent {
	constructor(conf) {
		this.value = (localStorage.units || 'metric');
		this._key = conf.localStorageKey;
		this._toggleButton = conf.toggleButton;
		this._outlet = conf.toggleButton;

		this._toggleButton.onclick = () => this.toggle();
	}

	_render() {
		this._outlet.textContent = (this.value === 'metric') ? '\xB0C' : '\xB0F'
	}

	init() {
		this.value = (localStorage[this._key] || 'metric')
		this._render();
		console.log('UnitsComponent', 'init');
	}

	toggle() {
		this.value = (this.value === 'metric') ? 'imperial' : 'metric';
		localStorage[this._key] = this.value;
		this._render();
		console.log('UnitsComponent', 'toggle');
	}
}
