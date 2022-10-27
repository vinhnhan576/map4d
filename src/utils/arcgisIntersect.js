/* eslint-disable no-undef */
import { loadModules } from "esri-loader";

function arcgisIntersect(coordinates, path, map) {
	return loadModules([
		"esri/layers/FeatureLayer",
		"esri/Graphic",
		"esri/geometry/geometryEngineAsync",
	])
		.then(([FeatureLayer, Graphic, geometryEngineAsync]) => {
			// const url =
			// 	"https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0";
			// var featureLayer = new FeatureLayer({ url: url });
			let squareShape1 = {
				type: "polygon",
				rings: coordinates,
				// spatialReference: featureLayer.spatialReference,
			};
			let squareShape2 = {
				type: "polygon",
				rings: path,
				// spatialReference: featureLayer.spatialReference,
			};
			let squareA = new Graphic({ geometry: squareShape1 });
			let squareB = new Graphic({ geometry: squareShape2 });
			return geometryEngineAsync
				.intersect(squareA.geometry, squareB.geometry)
				.then(function (result) {
					if (result) {
						// console.log("Found an Intersection!");
						let intersectingPolygon;
						intersectingPolygon = new map4d.Polygon({
							paths: result.rings,
							strokeWidth: 2,
							fillOpacity: 0.3,
							fillColor: "#ffffff",
						});
						intersectingPolygon.setMap(map);
						window.intersectingPolygons.push(intersectingPolygon);
						return Date.now();

						//DRAW INTERSECTING POLYGONS & ITS AREA

						// let intersectPath = result.rings[0];
						// intersectPath.splice(intersectPath.length - 1, 1);
						// let measure = new map4d.Measure(intersectPath);
						// let center = new map4d.Measure(intersectPath).center;
						// let marker = new map4d.Marker({
						// 	position: {
						// 		lat: center.lat,
						// 		lng: center.lng,
						// 	},
						// 	iconView: `<div style="text-align: center; color: red; font-weight: 500; font-size: 18px;text-shadow: 1px 1px 2px #636363;">${(
						// 		Math.round(measure.area * 100) / 100
						// 	).toFixed(2)}</div>`,
						// 	anchor: [0.5, 0.5],
						// });
						// marker.setMap(map);
						// window.polylineMarkers.push(marker);
					} else {
						// console.log("No Intersection");
						return -1;
					}
				})
				.catch(function (error) {
					console.log("Error: " + error);
				});
		})
		.catch((err) => console.error(err));
}

export default arcgisIntersect;
