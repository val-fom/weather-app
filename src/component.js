export class Component {
	_getIcons(source) {
		let icons = '';
		for (var i = source.length - 1; i >= 0; i--) {
			let timeOfDay = '';
			if (source[i].id >= 800 && source[i].id <= 803) {
				if (source[i].icon.endsWith('n')) timeOfDay = '-night';
				if (source[i].icon.endsWith('d')) timeOfDay = '-day';
			}
			icons += `<i class="wi wi-owm${timeOfDay}-${source[i].id}"` +
				`title="${source[i].main}: ${source[i].description}"></i>`;
		}
		return icons;
	}

	_requestUpdate(city) {
		const event = new CustomEvent('needUpdate', {
			bubbles: true,
			detail: { city: city }
		});
		this._outlet.dispatchEvent(event);
	}
}
