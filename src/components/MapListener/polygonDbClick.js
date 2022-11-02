/* eslint-disable no-undef */
import lineIntersect from "../../utils/lineIntersection";
import gridSearch from "../../utils/gridSearch";
import rectangleOverlap from "../../utils/rectangleOverlap";
import arcgisIntersect from "../../utils/arcgisIntersect";

const polygonDbClick = async (args, map) => {
	window.polygon.setMap(null);
	window.pathCells.push(gridSearch(window.grid, args.location));
	window.path.push([args.location.lng, args.location.lat]);
	window.path.splice(window.path.length - 2, 2);
	let path = window.path;
	window.polygon = new map4d.Polygon({
		fillOpacity: 0.4,
		paths: [[...path, [path[0][0], path[0][1]]]],
		strokeWidth: 2,
		strokeColor: "#4c7ea9",
		fillColor: "#ffffff",
	});
	window.polygon.setMap(map);

	//CALCULATE & DISPLAY TOTAL AREA ON AVERAGE POINT OF POLYGON
	if (window.mapFunctions.current?.childNodes[2].classList.contains("active")) {
		let measure = new map4d.Measure(path);
		// mapPolygonAreaInfo.innerHTML = measure.area + " (m^2)";

		let marker = new map4d.Marker({
			position: { lat: measure.center.lat, lng: measure.center.lng },
			iconView: `<div style="text-align: center; color: #4c7ea9; font-weight: 700; font-size: 30px;text-shadow: 1px 1px 2px #636363;">${(
				Math.round(measure.area * 100) / 100
			).toFixed(2)}</div>`,
			anchor: [0.5, 0.5],
		});
		marker.setMap(map);
		window.polylineMarkers.push(marker);
	}

	//CALCULATE & DISPLAY INTERSECTED POLYGON
	if (window.mapFunctions.current?.childNodes[3].classList.contains("active")) {
		window.start = Date.now();
		path = [...path, [path[0][0], path[0][1]]];
		let coordinatesOnGridList = [];
		let pathCells = [...new Set(window.pathCells)];
		let x_min = [];
		let y_max = [];
		let y_min = [];
		let x_max = [];
		let finalCells = [];
		if (!pathCells.includes(-1)) {
			pathCells.map((cell) => {
				finalCells.push(cell);
				coordinatesOnGridList.push(...window.grid[cell].paths);
				y_max.push(window.grid[cell].bound[0][0]);
				x_min.push(window.grid[cell].bound[0][1]);
				x_max.push(window.grid[cell].bound[1][1]);
				y_min.push(window.grid[cell].bound[1][0]);
			});

			y_min = y_min.reduce((a, b) => Math.min(a, b));
			x_max = x_max.reduce((a, b) => Math.max(a, b));
			x_min = x_min.reduce((a, b) => Math.min(a, b));
			y_max = y_max.reduce((a, b) => Math.max(a, b));
		} else {
			y_min = window.grid[0].bound[1][0];
			x_max = window.grid[0].bound[1][1];
			x_min = window.grid[window.grid.length - 1].bound[0][1];
			y_max = window.grid[window.grid.length - 1].bound[0][0];
		}

		window.grid.map((gridCell, index) => {
			let cellBound = gridCell.bound;
			if (
				cellBound[0][0] <= y_max &&
				cellBound[0][1] >= x_min &&
				cellBound[1][0] >= y_min &&
				cellBound[1][1] <= x_max &&
				!finalCells.includes(index)
			) {
				let pathIntersect = false;
				let insidePath = false;

				let gridCellPath = [
					cellBound[0],
					[cellBound[0][0], cellBound[1][1]],
					cellBound[1],
					[cellBound[1][0], cellBound[0][1]],
					cellBound[0],
				];
				loop: for (let j = 1; j < gridCellPath.length; j++)
					for (let i = 1; i < path.length; i++) {
						if (
							lineIntersect(
								path[i - 1][0],
								path[i - 1][1],
								path[i][0],
								path[i][1],
								gridCellPath[j - 1][0],
								gridCellPath[j - 1][1],
								gridCellPath[j][0],
								gridCellPath[j][1]
							)
						) {
							pathIntersect = true;
							break loop;
						}
					}
				if (!pathIntersect) {
					let path_x = [];
					let path_y = [];
					path.map((point) => {
						path_x.push(point[1]);
						path_y.push(point[0]);
					});
					let path_y_min = path_y.reduce((a, b) => Math.min(a, b));
					let path_x_max = path_x.reduce((a, b) => Math.max(a, b));
					let path_x_min = path_x.reduce((a, b) => Math.min(a, b));
					let path_y_max = path_y.reduce((a, b) => Math.max(a, b));
					if (
						cellBound[0][0] <= path_y_max &&
						cellBound[0][1] >= path_x_min &&
						cellBound[1][0] >= path_y_min &&
						cellBound[1][1] <= path_x_max
					)
						insidePath = true;
				}
				if (gridCell.paths.length !== 0 && (pathIntersect || insidePath)) {
					finalCells.push(index);
					coordinatesOnGridList.push(...gridCell.paths);
				}
			}
		});
		console.log(coordinatesOnGridList);
		coordinatesOnGridList = [...new Set(coordinatesOnGridList)];
		console.log(coordinatesOnGridList);

		const FULL_GRID_RENDER_TIME = 20000;

		window.duration = [];

		// let results = await Promise.all(
			coordinatesOnGridList.map(async (coordinates) => {
				return arcgisIntersect(coordinates, path, map);
			})
		// );
		// results = results.filter((n) => n);
		// const geo = {
		// 	type: "FeatureCollection",
		// 	features: results,
		// 	totalFeatures: results.length,
		// 	numberMatched: results.length,
		// 	numberReturned: results.length,
		// 	timeStamp: Date.now(),
		// 	crs: {
		// 		type: "name",
		// 		properties: { name: "urn:ogc:def:crs:EPSG::4326" },
		// 	},
		// };
		// console.log(geo);
		// window.features = map.data.addGeoJson(JSON.stringify(geo));
		// console.log(window.features)

		// console.log(results);
		// let end;
		// results.map((res) => {
		// 	if (res !== -1) end = res;
		// });

		// const duration = end - start;
		// const durationRatio = (duration / FULL_GRID_RENDER_TIME) * 100;
		// console.log(
		// 	"duration = " +
		// 		duration +
		// 		"ms (" +
		// 		durationRatio.toFixed(2) +
		// 		"% of total grid render time)"
		// );
	}
};

export default polygonDbClick;
