require('./History.scss')

export default class History {
	constructor() {
		this.state = {
			list: this.getFromLocalStorage()
		}
		this.host = document.createElement('div');
		this.host.classList.add('history__container');
		this.ul = document.createElement('ul');
		this.ul.classList.add('history');
		this.host.appendChild(this.ul);

		this.handleClick = this.handleClick.bind(this);
		this.ul.addEventListener('click', this.handleClick);

		this.clearButton = document.createElement('button');
		this.clearButton.classList.add('history__clear-button');
		this.clearButton.addEventListener('click', () => this.clear() );
		this.clearButton.innerHTML = '<i>+</i>';
		this.host.appendChild(this.clearButton);
	}

	render() {
		this.ul.innerHTML = '';
		for (var i = this.state.list.length - 1; i >= 0; i--) {
			const li = `
				<li class="history__city">
					<a href="#">${this.state.list[i]}</a>
				</li>
			`;
			this.ul.insertAdjacentHTML('beforeend', li);
		}
		return this.host;
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		this.render();
		console.log('History: state updated', this.state);
	}

	add(item) {
		const list = this.state.list.slice();
		let index = list.indexOf(item);
		if (~index) list.splice(index, 1);
		list.push(item);
		localStorage['history'] = JSON.stringify(list);
		this.updateState({ list: list });
	}

	getFromLocalStorage() {
		return (localStorage['history']) ?
			JSON.parse(localStorage['history']) : [];
	}

	clear() {
		localStorage['history'] = "[]";
		this.updateState({ list: [] });
	}

	handleClick(ev) {
		if (ev.target.tagName !== 'A') return;
		ev.preventDefault();
		const city = ev.target.innerHTML;
		this.dispatchSearchEvent(city);
	}

	dispatchSearchEvent(city) {
		const event = new CustomEvent('search', {
			bubbles: true,
			detail: { city: city }
		});
		this.host.dispatchEvent(event);
	}

	setCity({ city }) {
		this.add(city);
	}
}
