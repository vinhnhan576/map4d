function checkPolygonClockwise(path) {
	let sum = 0;
	for (let i = 1; i < path.length; i++) {
		sum += (path[i][0] - path[i - 1][0]) * (path[i][1] + path[i - 1][1]);
	}
	if (sum > 0) return true;
	return false;
}

export default checkPolygonClockwise;
