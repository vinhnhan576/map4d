/* eslint-disable no-undef */
import { useRef, useContext } from "react";
import Context from "../../index";
import "../MapFunctions/MapFunctions.css";

import gridSearch from "../../utils/gridSearch";

function ClickListener() {
	const map = useContext(Context);

	let infoWindow = useRef();

	map.addListener(
		"click",
		function (args) {
			console.log(dbclick)
			//MARKER CLICK LISTENER
			if (
				window.mapFunctions.current?.childNodes[0].classList.contains("active")
			) {
				if (window.marker !== null) {
					window.marker.setMap(null);
				}
				// eslint-disable-next-line no-undef
				window.marker = new map4d.Marker({
					position: args.location,
				});
				window.marker.setMap(map);
				window.markerInfo.current?.classList.add("open");
				let X = document.getElementsByClassName(
					"map-position-info-location"
				)[0];
				let Y = document.getElementsByClassName(
					"map-position-info-location"
				)[1];
				X.innerHTML = args.location.lat;
				Y.innerHTML = args.location.lng;

				let poi = args.poi;
				let place = args.place;
				if (poi !== undefined) {
					document.getElementById("title").innerText = "Name: " + poi.name;
					console.log(document.getElementById("title"));
					document.getElementById("subtitle").innerText = "ID: " + poi.id;

					let pixel = args.pixel;
					console.log(window.poiInfo);
					window.poiInfo.current.style.left = pixel.x + "px";
					window.poiInfo.current.style.top = pixel.y + "px";
					window.poiInfo.current.style.visibility = "visible";
				} else if (place !== undefined) {
					document.getElementById("title").innerText = "Name: " + place.name;
					document.getElementById("subtitle").innerText = "ID: " + place.id;

					let pixel = args.pixel;
					window.poiInfo.current.style.left = pixel.x + "px";
					window.poiInfo.current.style.top = pixel.y + "px";
					window.poiInfo.current.style.visibility = "visible";
				} else {
					window.poiInfo.current.style.visibility = "hidden";
				}
			}
			//POLYLINE CLICK LISTENER
			if (
				window.mapFunctions.current?.childNodes[1].classList.contains("active")
			) {
				if (window.dbclick) {
					window.path = [];
					window.polylineMouseMove.setMap(null);
					window.polylineMarkers.map((marker) => marker.setMap(null));
				}
				window.dbclick = false;

				let polylineMarker = new map4d.Marker({
					iconView: `<div style="width: 5px; height: 5px; background-color: white; outline:#4c7ea9 solid 3px; border-radius: 50%;"></div>`,
					anchor: [0.5, 0.5],
					position: args.location,
				});
				polylineMarker.setMap(map);
				window.polylineMarkers.push(polylineMarker);
				window.path.push([args.location.lng, args.location.lat]);
				window.polyline.setMap(null);
				window.polyline = new map4d.Polyline({
					path: window.path,
					strokeWidth: 5,
					strokeColor: "#4c7ea9",
				});
				window.polyline.setMap(map);

				let measure = new map4d.Measure(window.path);
			}

			//POLYGON CLICK LISTENER
			if (
				window.mapFunctions.current?.childNodes[2].classList.contains(
					"active"
				) ||
				window.mapFunctions.current?.childNodes[3].classList.contains("active")
			) {
				if (window.intersectingPolygons.length !== 0)
					window.intersectingPolygons.map((intersectingPolygon) =>
						intersectingPolygon.setMap(null)
					);
				window.intersectingPolygons = [];

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
				if (
					window.mapFunctions.current?.childNodes[3].classList.contains(
						"active"
					)
				)
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
				// mapPolygonAreaInfo.innerHTML = measure.area + " (m^2)";
			}
		},
		{
			marker: true,
			mappoi: true,
			place: true,
			location: true,
		}
	);

	return (
		<div>
			<div id="info" ref={infoWindow}>
				<div id="title"></div>
				<div id="subtitle"></div>
			</div>
		</div>
	);
}

export default ClickListener;
