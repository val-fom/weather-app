import { WEATHER_APP } from '../main.js'

export class HistoryComponent {
	constructor(conf) {
		this.data = conf.data;
		this._outlet = conf.outlet;
		this._template = conf.template;
		this._key = conf.localStorageKey
	}

	render() {
		const node = document.importNode(this._template.content, true);
		this.data.forEach((item) => {
			const li = node.cloneNode(true);
			const a = li.querySelector('a');
			a.innerHTML = item;
			a.onclick = () => false;
			this._outlet.appendChild(li);
		});
	}

	add(item) {
		let index = this.data.indexOf(item);
		if (index >= 0) this.data.splice(index, 1);
		if (this.data.includes(item)) return;
		this.data.push(item);
		localStorage[this._key] = JSON.stringify(this.data);
	}

	// getSearchHistory() {
	// 	if (!localStorage.searchHistory) return;
	// 	this.searchHistory = JSON.parse(localStorage.searchHistory);
	// }

	// clearHistory() {
	// 	this.searchHistory.length = 0;
	// 	this.searchList.innerHTML = "";
	// 	localStorage.searchHistory = "[]";
	// }
}
