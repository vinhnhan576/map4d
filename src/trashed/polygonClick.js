/* eslint-disable no-undef */
const polygonClick = (
	args,
	map,
	polygon,
	polylineMarkers,
	path,
	dbclick,
	polygonInfo
) => {
	// if (intersectingPolygons.length !== 0)
	// intersectingPolygons.map((intersectingPolygon) =>
	// intersectingPolygon.setMap(null)
	// );
	// intersectingPolygons = [];
	if (dbclick) {
		path = [];
		// pathCells = [];
		// polylineMouseMove.setMap(null);
		polylineMarkers.map((marker) => marker.setMap(null));
	}
	dbclick = false;
	let polylineMarker = new map4d.Marker({
		iconView: `<div style="width: 3px; height: 3px; background-color: white; outline:#4c7ea9 solid 3px; border-radius: 50%;"></div>`,
		anchor: [0.5, 0.5],
		position: args.location,
	});
	polylineMarker.setMap(map);
	polylineMarkers.push(polylineMarker);
	path.push([args.location.lng, args.location.lat]);
	// pathCells.push(gridSearch(grid, args.location));
	polygon.setMap(null);
	polygon = new map4d.Polygon({
		fillOpacity: 0.4,
		fillColor: "#ffffff",
		paths: [[...path, [path[0][0], path[0][1]]]],
		strokeWidth: 2,
		strokeColor: "#4c7ea9",
	});
	polygon.setMap(map);
	// eslint-disable-next-line no-undef
	let measure = new map4d.Measure(path);
	polygonInfo.current.childNodes[0].childNodes[1].innerText =
		measure.area + " (m^2)";
  return [polygon, polylineMarkers, path]
};

export default polygonClick;
