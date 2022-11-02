const onFunctionClick = (functionIndex, map) => {
	window.dbclick = false;
	//REMOVE GEOMETRICAL DISPLAYS
	if (window.marker !== null) window.marker.setMap(null);
	window.polyline.setMap(null);
	window.polylineMouseMove.setMap(null);
	window.polylineMarkers.map((marker) => marker.setMap(null));
	window.path = [];
	window.polygon.setMap(null);
	if (window.intersectingPolygons.length !== 0)
		window.intersectingPolygons.map((intersectingPolygon) =>
			intersectingPolygon.setMap(null)
		);
	if (window.features !== undefined)
		map.data.clear();

	// ENABLE SELF & REMOVE OTHER INFO DISPLAYS
	let mapFunctionsArray = window.mapFunctions.current?.childNodes;
	for (let i = 0; i < mapFunctionsArray?.length; i++) {
		i !== functionIndex
			? mapFunctionsArray[i].classList.remove("active")
			: mapFunctionsArray[i].classList.toggle("active");
	}
	mapFunctionsArray[0].classList.contains("active")
		? window.markerInfo.current?.classList.toggle("open")
		: window.markerInfo.current?.classList.remove("open");
	mapFunctionsArray[1].classList.contains("active")
		? window.polylineInfo.current?.classList.toggle("open")
		: window.polylineInfo.current?.classList.remove("open");
	mapFunctionsArray[2].classList.contains("active")
		? window.polygonInfo.current?.classList.toggle("open")
		: window.polygonInfo.current?.classList.remove("open");
};

export default onFunctionClick;
