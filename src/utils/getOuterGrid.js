const getOuterGrid = (optimizedPolygonList, coordinatesList) => {
	let x = [];
	let y = [];
	optimizedPolygonList.map((polygon) =>
		polygon.map((point) => {
			x.push(point[1]);
			y.push(point[0]);
		})
	);
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
	let P = {
		optimizedPaths: optimizedPolygonList,
		paths: coordinatesList,
		bound: [
			[y_max, x_min],
			[y_min, x_max],
		],
	};
	return P;
};

export default getOuterGrid;
