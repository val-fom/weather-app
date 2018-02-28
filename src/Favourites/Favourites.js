require('./Favourites.scss');

import { Component } from '../Framework';

export default class Favourites extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: this.getFromLocalStorage()
		}
		this.host = document.createElement('div');
		this.host.classList.add('favourites__container');
		this.ul = document.createElement('ul');
		this.ul.classList.add('favourites');
		this.host.appendChild(this.ul);
		this.handleClick = this.handleClick.bind(this);
		this.ul.addEventListener('click', this.handleClick);

		this.addButton = document.createElement('button');
		this.addButton.classList.add('favourites__add-button', 'button');
		this.addButton.addEventListener('click', () => {
			if (this.props) this.add(this.props.city);
		});
		this.addButton.innerHTML = '<i>+</i>';
		this.addButton.title = 'add to favourites';
		this.host.appendChild(this.addButton);

		this.clearButton = document.createElement('button');
		this.clearButton.classList.add('favourites__clear-button', 'button');
		this.clearButton.addEventListener('click', () => this.clear() );
		this.clearButton.title = 'clear favourites'

		this.clearButton.innerHTML = '<i>+</i>';
		this.host.appendChild(this.clearButton);
	}

	render() {
		this.ul.innerHTML = '';
		for (var i = this.state.list.length - 1; i >= 0; i--) {
			const li = `
				<li class="favourites__city">
					<a href="#">${this.state.list[i]}</a>
				</li>
			`;
			this.ul.insertAdjacentHTML('beforeend', li);
		}
		return [this.ul, this.addButton, this.clearButton];
	}

	add(item) {
		const list = this.state.list.slice();
		let index = list.indexOf(item);
		if (item === list[list.length - 1]) return;
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
		if (ev.target.tagName !== 'A') return;
		ev.preventDefault();
		const city = ev.target.innerHTML;
		this.props.onClick(city);
	}
}
