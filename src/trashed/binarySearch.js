import insidePoly from "../utils/insdePoly";

function binarySearch(array, cursor) {
	let firstIndex = 0;
	let lastIndex = array.length - 1;
	let middleIndex = Math.floor((firstIndex + lastIndex) / 2);

	let bound = array[middleIndex].bound;

	while (
		!insidePoly(
			bound[0],
			[bound[0][0], bound[1][1]],
			bound[1],
			[bound[1][0], bound[0][1]],
			bound[0],
			cursor.lng,
			cursor.lat
		) &&
		firstIndex <= lastIndex
	) {
		if (
			array[middleIndex].bound[1][0] > cursor.lng &&
			array[middleIndex].bound[0][1] > cursor.lat
		) {
			lastIndex = middleIndex - 1;
		} else {
			firstIndex = middleIndex + 1;
		}
		middleIndex = Math.floor((firstIndex + lastIndex) / 2);
	}
	return !insidePoly(
		bound[0],
		[bound[0][0], bound[1][1]],
		bound[1],
		[bound[1][0], bound[0][1]],
		bound[0],
		cursor.lng,
		cursor.lat
	)
		? middleIndex
		: -1;
}

export default binarySearch;
