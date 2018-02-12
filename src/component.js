export class Component {
	constructor() {

	}

	getIcons(source) {
		let icons = '';
		for (var i = source.length - 1; i >= 0; i--) {
			// source[i] /// weather
			let timeOfDay = ''; // to set -day or -night icon type
			if (source[i].icon.endsWith('n')) timeOfDay = '-night';
			if (source[i].icon.endsWith('d')) timeOfDay = '-day';
			const icon = `<i class="wi wi-owm${timeOfDay}-${source[i].id}"` +
				`title="${source[i].main}: ${source[i].description}"></i>`;
			icons += icon;
		}
		return icons;
	}
}
