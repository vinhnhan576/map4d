/* eslint-disable no-undef */
import gridSearch from "../../utils/gridSearch";

const polygonClick = (args, map) => {
	// if (window.intersectingPolygons.length !== 0)
	// 	window.intersectingPolygons.map((intersectingPolygon) =>
	// 		intersectingPolygon.setMap(null)
	// 	);
	// window.intersectingPolygons = [];
	// if (window.features !== undefined)
	// 	window.features.forEach((feature) => map.data.remove(feature));
	if (window.dbclick) {
		window.path = [];
		window.pathCells = [];
		window.polylineMouseMove.setMap(null);
		window.polylineMarkers.map((marker) => marker.setMap(null));
	}
	window.dbclick = false;
	let polylineMarker = new map4d.Marker({
		iconView: `<div style="width: 3px; height: 3px; background-color: white; outline:#4c7ea9 solid 3px; border-radius: 50%;"></div>`,
		anchor: [0.5, 0.5],
		position: args.location,
	});
	polylineMarker.setMap(map);
	window.polylineMarkers.push(polylineMarker);
	window.path.push([args.location.lng, args.location.lat]);
	window.pathCells.push(gridSearch(window.grid, args.location));
	window.polygon.setMap(null);
	let path = window.path;
	window.polygon = new map4d.Polygon({
		fillOpacity: 0.4,
		fillColor: "#ffffff",
		paths: [[...path, [path[0][0], path[0][1]]]],
		strokeWidth: 2,
		strokeColor: "#4c7ea9",
	});
	window.polygon.setMap(map);

	let measure = new map4d.Measure(path);
	window.polygonInfo.current.childNodes[0].childNodes[1].innerText =
		measure.area + " (m^2)";
};

export default polygonClick;
