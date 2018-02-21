require('./Favourites.scss')

export default class Favourites {
	constructor() {
		this.state = {
			list: this.getFromLocalStorage()
			// list: ['Kyiv,UA', 'Lviv,UA']
		}
		this.host = document.createElement('div');
		this.host.classList.add('favourites__container');
		this.ul = document.createElement('ul');
		this.ul.classList.add('favourites');
		this.host.appendChild(this.ul);
		this.handleClick = this.handleClick.bind(this);
		this.ul.addEventListener('click', this.handleClick);

		this.addButton = document.createElement('button');
		this.addButton.classList.add('favourites__add-button');
		this.addButton.addEventListener('click', () => {
			if (this.state.city) this.add(this.state.city)
		});

		this.clearButton = document.createElement('button');
		this.clearButton.classList.add('favourites__clear-button');
		this.clearButton.addEventListener('click', () => this.clear() );
	}

	render() {
		this.ul.innerHTML = '';
		for (var i = this.state.list.length - 1; i >= 0; i--) {
			const li = `
				<li class="button favourites__city">
					<a href="#">${this.state.list[i]}</a>
				</li>
			`;
			this.ul.insertAdjacentHTML('beforeend', li);
		}
		this.addButton.textContent = '+';
		this.host.appendChild(this.addButton);

		this.clearButton.innerHTML = '<i>+</i>';
		this.host.appendChild(this.clearButton);

		return this.host;
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		this.render();
		console.log('Favourites: state updated', this.state);
	}

	add(item) {
		const list = this.state.list.slice();
		let index = list.indexOf(item);
		if (~index) list.splice(index, 1);
		list.push(item);
		localStorage['favourites'] = JSON.stringify(list);
		this.updateState({ list: list });
	}

	getFromLocalStorage() {
		return (localStorage['favourites']) ?
			JSON.parse(localStorage['favourites']) : [];
	}

	clear() {
		localStorage['favourites'] = "[]";
		this.updateState({ list: [] });
	}

	handleClick(ev) {
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

}
