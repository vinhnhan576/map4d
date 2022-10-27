/* eslint-disable no-undef */
import getCenterLatlng from "./getCenterLatlng";
import rectangleOverlap from "./rectangleOverlap";

let MIN_POINTS = 80;

const divideGrid = (gridCell, map) => {
	if (gridCell.paths.length <= MIN_POINTS) {
		delete gridCell.optimizedPaths;
		window.grid.push(gridCell);
		let bound = gridCell.bound;
		let marker = new map4d.Marker({
			position: new map4d.Measure([
				bound[0],
				[bound[0][0], bound[1][1]],
				bound[1],
				[bound[1][0], bound[0][1]],
			]).center,
			iconView: `<div style="width: 32px; height: 32px; text-align: center; color: red;font-weight:700;">${grid.length}</div>`,
			anchor: [0.5, 0.5],
		});
		marker.setMap(map);
	} else {
		//GET CELL BOUND
		let y_max = gridCell.bound[0][0];
		let x_min = gridCell.bound[0][1];
		let y_min = gridCell.bound[1][0];
		let x_max = gridCell.bound[1][1];
		let y_avg = getCenterLatlng([
			[x_min, y_max],
			[x_min, y_min],
		])[1];
		let x_avg = getCenterLatlng([
			[x_max, y_max],
			[x_min, y_max],
		])[0];

		//Dividing cell into 4 subcells
		let P4 = [];
		P4.push({
			paths: [],
			optimizedPaths: [],
			bound: [
				[y_avg, x_avg],
				[y_min, x_max],
			],
		});
		P4.push({
			paths: [],
			optimizedPaths: [],
			bound: [
				[y_max, x_avg],
				[y_avg, x_max],
			],
		});
		P4.push({
			paths: [],
			optimizedPaths: [],
			bound: [
				[y_avg, x_min],
				[y_min, x_avg],
			],
		});
		P4.push({
			paths: [],
			optimizedPaths: [],
			bound: [
				[y_max, x_min],
				[y_avg, x_avg],
			],
		});

		//Draw the 4 subcells for better visualisation
		P4.map((gridCell) => {
			let bound = gridCell.bound;
			let polygon = new map4d.Polygon({
				fillOpacity: 0.1,
				paths: [
					[
						bound[0],
						[bound[0][0], bound[1][1]],
						bound[1],
						[bound[1][0], bound[0][1]],
						bound[0],
					],
				],
			});
			polygon.setMap(map);
		});

		//Push paths into the subcells
		gridCell.optimizedPaths.map((polygon, index) => {
			for (let j = 0; j < P4.length; j++) {
				// for (let i = 0; i < polygon.length; i++) {
				let bound = P4[j].bound;
				if (
					// insideRect(
					// 	bound[0][1],
					// 	bound[0][0],
					// 	bound[1][1],
					// 	bound[1][0],
					// 	polygon[i][1],
					// 	polygon[i][0]
					// )
					rectangleOverlap(bound[0], bound[1], polygon[3], polygon[1])
				) {
					P4[j].paths.push(gridCell.paths[index]);
					P4[j].optimizedPaths.push(polygon);
				}
				// }
			}
		});

		//Continue dividing the subcells
		P4.map((gridCell) => divideGrid(gridCell, map));
	}
};

export default divideGrid;
