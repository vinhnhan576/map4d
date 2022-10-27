/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
let optimizedPolygonList = [];

function optimizePolygons(coordinatesList, map) {
	coordinatesList.map((coordinate) => {
		let x = [];
		let y = [];
		coordinate.splice(coordinate.length - 1, 1);
		// if (coordinate.length > 4) {
			coordinate.map((point) => {
				x.push(point[1]);
				y.push(point[0]);
			});
			let x_min = x.reduce((a, b) => {
				return Math.min(a, b);
			});
			let x_max = x.reduce((a, b) => {
				return Math.max(a, b);
			});
			let y_min = y.reduce((a, b) => {
				return Math.min(a, b);
			});
			let y_max = y.reduce((a, b) => {
				return Math.max(a, b);
			});
			let rect = new map4d.Polygon({
				paths: [
					[
						[y_min, x_min],
						[y_min, x_max],
						[y_max, x_max],
						[y_max, x_min],
						[y_min, x_min],
					],
				],
				fillOpacity: 0,
				strokeWidth: 1,
				strokeColor: "#0000FF",
			});
			// rect.setMap(map);
			optimizedPolygonList.push([
				[y_min, x_min],
				[y_min, x_max],
				[y_max, x_max],
				[y_max, x_min],
			]);
		// } else {
		// 	optimizedPolygonList.push(coordinate);
		// }
	});
	return optimizedPolygonList;
}

export default optimizePolygons;
