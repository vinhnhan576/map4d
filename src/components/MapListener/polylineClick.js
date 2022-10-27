/* eslint-disable no-undef */

const polylineClick = (args, map) => {
	if (window.dbclick) {
		window.path = [];
		window.polylineMouseMove.setMap(null);
		window.polylineMarkers.map((marker) => marker.setMap(null));
	}
	window.dbclick = false;

	let polylineMarker = new map4d.Marker({
		iconView: `<div style="width: 5px; height: 5px; background-color: white; outline:#4c7ea9 solid 3px; border-radius: 50%;"></div>`,
		anchor: [0.5, 0.5],
		position: args.location,
	});
	polylineMarker.setMap(map);
	window.polylineMarkers.push(polylineMarker);
	window.path.push([args.location.lng, args.location.lat]);
	console.log(args.location);
	window.polyline.setMap(null);
	window.polyline = new map4d.Polyline({
		path: window.path,
		strokeWidth: 5,
		strokeColor: "#4c7ea9",
	});
	window.polyline.setMap(map);

	let measure = new map4d.Measure(window.path);
	window.polylineInfo.current.childNodes[0].childNodes[1].innerText =
		measure.length + " (m)";
};

export default polylineClick;
