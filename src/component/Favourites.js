require('./Favourites.scss')

export default class Favourites {
	constructor() {
		this.host = document.createElement('div');
		this.host.classList.add('favorites__container');
	}

	render() {
		this.host.innerHTML = `
			<ul class="favorites" data-favourites>
				<!-- js will put content here -->
				<template>
					<li class="button favorites__city">
						<a href="#"></a>
					</li>
				</template>
			</ul>
		`;
		return this.host;
	}
}
