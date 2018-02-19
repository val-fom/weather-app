require('./History.scss')

export default class History {
	constructor() {
		this.host = document.createElement('div');
		this.host.classList.add('history__container');
	}

	render() {
		this.host.innerHTML = `
			<ul class="history" data-history>
				<!-- js will put content here -->
				<template>
					<li class="history__city">
						<a href="#"></a>
					</li>
				</template>
			</ul>
		`;
		return this.host;
	}
}
