import { WEATHER_APP } from '../main.js'

export class HistoryComponent {
	constructor(conf) {
		this.data = conf.data;
		this.outlet = conf.outlet;
		this._template = conf.template;
		this._key = conf.localStorageKey;
		this._clearButton = conf.clearButton;

		this._clearButton.onclick = () => this.clear();
	}

	_render() {
		this.outlet.innerHTML = '';
		const node = document.importNode(this._template.content, true);
		for (var i = this.data.length - 1; i >= 0; i--) {
			const li = node.cloneNode(true);
			const a = li.querySelector('a');
			a.innerHTML = this.data[i];
			a.onclick = () => false;
			this.outlet.appendChild(li);
		}
	}

	add(item) {
		let index = this.data.indexOf(item);
		if (index >= 0) this.data.splice(index, 1);
		this.data.push(item);
		localStorage[this._key] = JSON.stringify(this.data);
		this._render();
	}

	get() {
		if (!localStorage[this._key]) return;
		this.data = JSON.parse(localStorage[this._key]);
		this._render();
	}

	clear() {
		this.data.length = 0;
		localStorage[this._key] = "[]";
		this._render();
	}

}
