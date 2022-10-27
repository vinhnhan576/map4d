const markerClick = (args, map, markerInfo, poiInfo) => {
	console.log(typeof window.marker !== "undefined");
	if (window.marker !== null) {
		window.marker.setMap(null);
	}
	// eslint-disable-next-line no-undef
	window.marker = new map4d.Marker({
		position: args.location,
	});
	window.marker.setMap(map); 

	markerInfo.current?.classList.add("open");
	let X = document.getElementsByClassName("map-position-info-location")[0];
	let Y = document.getElementsByClassName("map-position-info-location")[1];
	X.innerHTML = args.location.lat;
	Y.innerHTML = args.location.lng;

	let poi = args.poi;
	let place = args.place;
	console.log(poi === undefined);
	if (poi !== undefined) {
		document.getElementById("title").innerText = "Name: " + poi.name;
		document.getElementById("subtitle").innerText = "ID: " + poi.id;

		let pixel = args.pixel;
		poiInfo.current.style.left = pixel.x + "px";
		poiInfo.current.style.top = pixel.y + "px";
		poiInfo.current.style.visibility = "visible";
	} else if (place !== undefined) {
		document.getElementById("title").innerText = "Name: " + place.name;
		document.getElementById("subtitle").innerText = "ID: " + place.id;

		let pixel = args.pixel;
		poiInfo.current.style.left = pixel.x + "px";
		poiInfo.current.style.top = pixel.y + "px";
		poiInfo.current.style.visibility = "visible";
	} else {
		poiInfo.current.style.visibility = "hidden";
	}
};

export default markerClick;
