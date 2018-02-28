export const getCityFromUrl = () => {
	const hash = window.location.hash;
	if (hash.startsWith('#/')) {
		const city = hash.slice(2);
		return decodeURI(city);
	}
}

export const pushHistoryState = ({ city, units }) => {
	window.history.pushState({ city, units }, null, `#/${city}`);
}

export const setCityTitle = (city) => {
	const newTitle = `Weather App - ${city}`;
	if (document.title !== newTitle) document.title = newTitle;
}

export const getHours = (dt) => {
	const date = new Date(dt * 1000);
	return date.getHours().toString().padStart(2, '0');
}
