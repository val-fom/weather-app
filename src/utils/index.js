export const getCityFromUrl = () => {
	const url = new URL(window.location.href);
	if (url.search.startsWith('?q=')) {
		const city = url.search.slice(3);
		return decodeURI(city);
	}
}

export const updateUrl = (city) => {
	window.history.pushState(null, null, `?q=${city}`);
}

export const setCityTitle = (city) => {
	const newTitle = `Weather App - ${city}`;
	if (document.title !== newTitle) document.title = newTitle;
}

export const getHours = (dt) => {
	const date = new Date(dt * 1000);
	return date.getHours().toString().padStart(2, '0');
}
