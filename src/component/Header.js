require('./header.scss')

export default class Header {
	constructor() {
		this.host = document.createElement('div');
		this.host.classList.add('header__container');
	}

	render() {
		this.host.innerHTML = `
			<header class="header">
				<h1 class="header__heading">Weather App</h1>
			</header>
		`;
		return this.host;
	}
}
