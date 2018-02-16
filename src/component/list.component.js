import { Component } from '../component.js'

export class ListComponent extends Component {
	constructor(conf) {
		super();
		this._list = [];
		this._outlet = conf.outlet;
		this._template = conf.template;
		this._key = conf.localStorageKey;
		this._clearButton = conf.clearButton;

		this._clearButton.onclick = () => this.clear();
		this._outlet.onclick = (event) =>
			this._requestUpdate(event.target.innerHTML);
	}

	_render() {
		this._outlet.innerHTML = '';
		const node = document.importNode(this._template.content, true);
		for (var i = this._list.length - 1; i >= 0; i--) {
			const li = node.cloneNode(true);
			const a = li.querySelector('a');
			a.innerHTML = this._list[i];
			a.onclick = () => false;
			this._outlet.appendChild(li);
		}
	}

	add(item) {
		let index = this._list.indexOf(item);
		if (index >= 0) this._list.splice(index, 1);
		this._list.push(item);
		localStorage[this._key] = JSON.stringify(this._list);
		this._render();
	}

	init() {
		if (!localStorage[this._key]) return;
		this._list = JSON.parse(localStorage[this._key]);
		this._render();
	}

	clear() {
		this._list.length = 0;
		localStorage[this._key] = "[]";
		this._render();
	}
}
