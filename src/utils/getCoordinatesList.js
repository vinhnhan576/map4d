const getCoordinatesList = (jsonData) => {
  let coordinatesList = [];
	jsonData.features.map((obj) => {
		let geometry = obj.geometry;
		if (geometry.type === "Polygon") {
			let coordinate = obj.geometry.coordinates[0];
			coordinatesList.push(coordinate);
		}
		if (geometry.type === "MultiPolygon") {
			obj.geometry.coordinates.map((coordinates) =>
				coordinatesList.push(coordinates[0])
			);
		}
	});
  return coordinatesList;
}

export default getCoordinatesList;