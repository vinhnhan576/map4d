/* eslint-disable no-undef */
import { useRef, useContext } from "react";
import Context from "../index";

function MouseMoveListener() {
	const map = useContext(Context);

	map.addListener(
		"mouseMove",
		function (args) {
			//POLYLINE MOUSEMOVE LISTENER
			if (
				(window.mapFunctions.current?.childNodes[1].classList.contains(
					"active"
				) ||
					window.mapFunctions.current?.childNodes[2].classList.contains(
						"active"
					) ||
					window.mapFunctions.current?.childNodes[3].classList.contains(
						"active"
					)) &&
				!window.dbclick
			) {
				if (window.path.length !== 0) {
					window.polylineMouseMove.setMap(null);
					let path = window.path;
					window.polylineMouseMove = new map4d.Polyline({
						path: [
							[path[path.length - 1][0], path[path.length - 1][1]],
							[args.location.lng, args.location.lat],
						],
						strokeWidth: 4,
						strokeColor: "#4c7ea9",
						strokeOpacity: 0.5,
					});
					window.polylineMouseMove.setMap(map);
				}
			}
		},
		{ location: true, polyline: true }
	);

	return <div></div>;
}

export default MouseMoveListener;
