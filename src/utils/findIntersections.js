import arcgisIntersect from "./arcgisIntersect";

async function findIntersection(coordinatesOnGridList, path, map) {
	let end;
	end = await coordinatesOnGridList.map(async (coordinates) => {
		return await arcgisIntersect(coordinates, path, map);
	});
	return end;
}

export default findIntersection;
