import React from "react";
import Context from "..";

const InsidePoly = (poly, pointx, pointy) => {
	const map = React.useContext(Context);

	var i, j;
	var inside = false;
	for (i = 0, j = poly.length - 1; i < poly.length; j = i++) {
		if (
			poly[i][1] >= pointy != poly[j][1] >= pointy &&
			pointx <=
				((poly[j][0] - poly[i][0]) * (pointy - poly[i][1])) /
					(poly[j][1] - poly[i][1]) +
					poly[i][0]
		)
			inside = !inside;
	}
	return inside;
};

export default InsidePoly;
