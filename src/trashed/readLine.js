/* eslint-disable no-undef */
function readLine(lines, map) {
	// lines.map((obj) => {
	// 	let coordinates = [];
	// 	if (obj.geometry.type === "LineString") {
	// 		coordinates = obj.geometry.coordinates;
	// 	}
	// 	if (obj.geometry.type === "MultiLineString") {
	// 		for (let i = 0; i < obj.geometry.coordinates.length; i++) {
	// 			coordinates = coordinates.concat(obj.geometry.coordinates[i]);
	// 		}
	// 	}

	// 	let line = new map4d.Polyline({
	// 		path: coordinates,
	// 		stroke: obj.properties.stroke,
	// 		strokeOpacity: obj.properties.strokeOpacity,
	// 		strokeWidth: obj.properties.strokeWidth,
	// 	});
	// 	line.setMap(map);
	// });
	let features = map.data.addGeoJson(lines);
}

export default readLine;
