/* eslint-disable no-undef */
const polylineClick = (args, map, polyline, polylineMarkers, path, dbclick) => {
	if (dbclick) {
		path = [];
		polylineMouseMove.setMap(null);
		polylineMarkers.map((marker) => marker.setMap(null));
	}
	dbclick = false;

	let polylineMarker = new map4d.Marker({
		iconView: `<div style="width: 5px; height: 5px; background-color: white; outline:#4c7ea9 solid 3px; border-radius: 50%;"></div>`,
		anchor: [0.5, 0.5],
		position: args.location,
	});
	polylineMarker.setMap(map);
	polylineMarkers.push(polylineMarker);
	path.push([args.location.lng, args.location.lat]);
	polyline.setMap(null);
	polyline = new map4d.Polyline({
		path: path,
		strokeWidth: 5,
		strokeColor: "#4c7ea9",
	});
	polyline.setMap(map);

	let measure = new map4d.Measure(path);
	// mapPolylineLengthInfo.innerHTML = measure.length + " (m)";
	return [polyline, polylineMarkers, path];
};

export default polylineClick;
