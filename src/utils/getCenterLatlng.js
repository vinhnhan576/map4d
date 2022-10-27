function GetCenterFromDegrees(data) {
	if (!(data.length > 0)) {
		return false;
	}

	var num_coords = data.length;

	var X = 0.0;
	var Y = 0.0;
	var Z = 0.0;

	for (let i = 0; i < data.length; i++) {
		var lat1 = (data[i][0] * Math.PI) / 180;
		var lng1 = (data[i][1] * Math.PI) / 180;

		var a = Math.cos(lat1) * Math.cos(lng1);
		var b = Math.cos(lat1) * Math.sin(lng1);
		var c = Math.sin(lat1);

		X += a;
		Y += b;
		Z += c;
	}

	X /= num_coords;
	Y /= num_coords;
	Z /= num_coords;

	var lon = Math.atan2(Y, X);
	var hyp = Math.sqrt(X * X + Y * Y);
	var lat = Math.atan2(Z, hyp);

	var newX = (lat * 180) / Math.PI;
	var newY = (lon * 180) / Math.PI;

	return [newX, newY];
}

export default GetCenterFromDegrees;
