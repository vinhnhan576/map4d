const insideRect = (rectx1, recty1, rectx2, recty2, pointx, pointy) => {
	if (pointx >= rectx1 && pointx <= rectx2 && pointy >= recty2 && pointy <= recty1)
		return true;
	return false;
};

export default insideRect;
