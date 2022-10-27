/* eslint-disable no-undef */

const polylineDbClick = (args, map) => {
	window.polyline.setMap(null);
	window.path.push([args.location[0],args.location[1]]);
	window.path.splice(window.path.length - 2, 2);
	let path = window.path;
	window.polyline = new map4d.Polyline({
		path: path,
		strokeWidth: 5,
		strokeColor: "#4c7ea9",
	});
	window.polyline.setMap(map);

	let displayingLineIndex;
	let averageMeasuredLength = new map4d.Measure(path).length / 2;
	let averageLength = 0;
	let ratio;

	for (let dot = 1; dot < path.length; dot++) {
		averageLength += new map4d.Measure([path[dot - 1], path[dot]]).length;
		if (averageLength > averageMeasuredLength) {
			ratio =
				(averageLength - averageMeasuredLength) /
				new map4d.Measure([path[dot - 1], path[dot]]).length;
			displayingLineIndex = dot;
			break;
		}
	}

	let averageLatLng = {
		lat:
			path[displayingLineIndex][1] +
			ratio *
				(path[displayingLineIndex - 1][1] - path[displayingLineIndex][1]),
		lng:
			path[displayingLineIndex][0] +
			ratio *
				(path[displayingLineIndex - 1][0] - path[displayingLineIndex][0]),
	};

	//CALCULATE & DISPLAY POLYLINE'S TOTAL LENGTH ON ITS AVERAGE POINT
	let measure = new map4d.Measure(path);
	// mapPolylineLengthInfo.innerHTML = measure.length + " (m)";
	let marker = new map4d.Marker({
		position: averageLatLng,
		iconView: `<div style="text-align: center; color: red; font-weight: 700; font-size: 30px;text-shadow: 1px 1px 2px #636363;">${(
			Math.round(measure.length * 100) / 100
		).toFixed(2)}</div>`,
		anchor: [0.5, 0.5],
	});
	marker.setMap(map);
	window.polylineMarkers.push(marker);
};
export default polylineDbClick;
