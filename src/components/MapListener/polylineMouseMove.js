/* eslint-disable no-undef */
const polylineMouseMove = (args, map) => {
	let mapFunctions = window.mapFunctions.current?.childNodes;
	if (
		(mapFunctions[1].classList.contains("active") ||
			mapFunctions[2].classList.contains("active") ||
			mapFunctions[3].classList.contains("active")) &&
		!window.dbclick
	) {
		if (window.path.length !== 0) {
			window.polylineMouseMove.setMap(null);
			let path = window.path;
			window.polylineMouseMove = new map4d.Polyline({
				path: [
					[path[path.length - 1][0], path[path.length - 1][1]],
					[args.location.lng, args.location.lat],
				],
				strokeWidth: 4,
				strokeColor: "#4c7ea9",
				strokeOpacity: 0.5,
			});
			window.polylineMouseMove.setMap(map);
		}
	}
};

export default polylineMouseMove;
