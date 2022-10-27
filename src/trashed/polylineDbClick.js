/* eslint-disable no-undef */
const polylineDbClick = (args, map, polyline, polylineMarkers, path) => {
	polyline.setMap(null);
	path.push({ lat: args.location.lat, lng: args.location.lng });
	polyline = new map4d.Polyline({
		path: path,
		strokeWidth: 5,
		strokeColor: "#4c7ea9",
	});
	polyline.setMap(map);

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
			path[displayingLineIndex].lat +
			ratio *
				(path[displayingLineIndex - 1].lat - path[displayingLineIndex].lat),
		lng:
			path[displayingLineIndex].lng +
			ratio *
				(path[displayingLineIndex - 1].lng - path[displayingLineIndex].lng),
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
	polylineMarkers.push(marker);
  
  return [polyline, polylineMarkers]
};
export default polylineDbClick;
