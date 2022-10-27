function gridSearch(array, cursor) {
	for (let i = 0; i < array.length; i++) {
		let y_max = array[i].bound[0][0];
		let x_min = array[i].bound[0][1];
		let y_min = array[i].bound[1][0];
		let x_max = array[i].bound[1][1];
		if (
			cursor.lat < x_max &&
			cursor.lat > x_min &&
			cursor.lng < y_max &&
			cursor.lng > y_min
		)
			return i;
	}
	return -1;
}

export default gridSearch;
