/* eslint-disable no-undef */
import "./App.css";
import { useContext, useRef } from "react";
import Context from "../../index";

import Marker from "../MapFunctions/Marker";
import Polyline from "../MapFunctions/Polyline";
import Polygon from "../MapFunctions/Polygon";
import Intersect from "../MapFunctions/Intersect";

import geometry from "../../data/Geometry.json";
import DN from "../../data/DN_Publish.json";
import AnPhu from "../../data/AnPhu_WGS84.json";
import AnPhutxt from '../../data/AnPhu_WGS84.txt'

import MarkerInfo from "../MapFunctionsInfo/MarkerInfo";
import PolylineInfo from "../MapFunctionsInfo/PolylineInfo";
import PolygonInfo from "../MapFunctionsInfo/PolygonInfo";

import markerClick from "../MapListener/markerClick";
import polylineClick from "../MapListener/polylineClick";
import polygonClick from "../MapListener/polygonClick";
import polylineDbClick from "../MapListener/polylineDbClick";
import polygonDbClick from "../MapListener/polygonDbClick";
import polylineMouseMove from "../MapListener/polylineMouseMove";

import optimizePolygons from "../../utils/optimizePolygons";
import getOuterGrid from "../../utils/getOuterGrid";
import divideGrid from "../../utils/divideGrid";
import getCoordinatesList from "../../utils/getCoordinatesList";

function App() {
	const map = useContext(Context);
	// InsidePoly(1,2,3);
	//INITIALIZE GLOBAL VARIABLES
	window.mapFunctions = useRef(null);
	window.markerInfo = useRef(null);
	window.poiInfo = useRef(null);
	window.polygonInfo = useRef(null);
	window.polylineInfo = useRef(null);

	window.marker = null;
	window.path = [];
	window.polyline = new map4d.Polyline({ path: [] });
	window.polylineMarkers = [];
	window.polygon = new map4d.Polygon({ paths: [[]] });
	window.polylineMouseMove = new map4d.Polyline({ path: [] });

	window.intersectingPolygons = [];
	window.pathCells = [];
	window.dbclick = false;

	// DRAW GEOMETRIES FROM JSON FILE
	map.data.addGeoJson(JSON.stringify(geometry));
	map.data.addGeoJson(JSON.stringify(DN));
	map.data.addGeoJson(AnPhutxt);

	//GET POLYGON COORDINATES
	let coordinatesList = getCoordinatesList(DN);
	// coordinatesList = [...coordinatesList, ...getCoordinatesList(geometry)];

	//OPTIMIZING POLYGONS WITH MORE THAN 4 APEXES
	let optimizedPolygonList = optimizePolygons(coordinatesList, map);

	//GET OUTER GRID BOUND
	let outerGrid = getOuterGrid(optimizedPolygonList, coordinatesList);

	//DIVIDE GRID
	window.grid = [];
	divideGrid(outerGrid, map);
	console.log("grid:");
	console.log(grid);

	map.addListener(
		"click",
		function (args) {
			let mapFunctions = window.mapFunctions.current.childNodes;
			if (mapFunctions[0].classList.contains("active")) {
				markerClick(args, map);
			}
			if (mapFunctions[1].classList.contains("active")) {
				polylineClick(args, map);
			}
			if (
				mapFunctions[2].classList.contains("active") ||
				mapFunctions[3].classList.contains("active")
			) {
				polygonClick(args, map);
			}
		},
		{
			location: true,
			marker: true,
			mappoi: true,
			place: true,
			polyline: true,
			polygon: true,
		}
	);

	map.addListener(
		"mouseMove",
		function (args) {
			polylineMouseMove(args, map);
		},
		{ location: true, polyline: true }
	);

	map.addListener(
		"dblClick",
		function (args) {
			let mapFunctions = window.mapFunctions.current?.childNodes;
			//DISPLAY JOINT MARKERS FOR POLYLINE & POLYGON DBLCLICK LISTENER
			if (
				(mapFunctions[1].classList.contains("active") ||
					mapFunctions[2].classList.contains("active") ||
					mapFunctions[3].classList.contains("active")) &&
				!window.dbclick
			) {
				dbclick = true;
				let polylineMarker = new map4d.Marker({
					iconView: `<div style="width: 5px; height: 5px; background-color: white; outline:#4c7ea9 solid 3px; border-radius: 50%;"></div>`,
					anchor: [0.5, 0.5],
					position: args.location,
				});
				polylineMarker.setMap(map);
				polylineMarkers.push(polylineMarker);

				//POLYLINE DBLCLICK LISTENER
				if (mapFunctions[1].classList.contains("active"))
					polylineDbClick(args, map);

				//POLYGON DBLCLICK LISTENER
				if (
					mapFunctions[2].classList.contains("active") ||
					mapFunctions[3].classList.contains("active")
				)
					polygonDbClick(args, map);
			}
		},
		{ location: true, polyline: true, marker: true, circle: true }
	);

	return (
		<div className="App">
			<div className="map-functions" ref={window.mapFunctions}>
				<Marker />
				<Polyline />
				<Polygon />
				<Intersect />
			</div>
			<div className="map-functions-info">
				<MarkerInfo markerInfo={window.markerInfo} poiInfo={window.poiInfo} />
				<PolylineInfo polylineInfo={window.polylineInfo} />
				<PolygonInfo polygonInfo={window.polygonInfo} />
			</div>
		</div>
	);
}

export default App;
