export const _getCityFromUrl = () => {
	let url = new URL(window.location.href);
	if (url.search.startsWith('?q=')) {
		return url.search.slice(3);
	}
}
