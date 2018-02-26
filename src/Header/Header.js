require('./header.scss')

import Component from '../Component'

export default class Header extends Component {
	constructor() {
		super();

		this.host = document.createElement('div');
		this.host.classList.add('header__container');
	}

	render() {
		return `
			<header class="header">
				<h1 class="header__heading">Weather App</h1>
			</header>
		`;
	}
}
