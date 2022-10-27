const rectangleOverlap = (l1, r1, l2, r2) => {
	// If one rectangle is on left side of other
	if (l1[1] > r2[1] || l2[1] > r1[1]) return false;

	// If one rectangle is above other
	if (r1[0] > l2[0] || r2[0] > l1[0]) return false;

	return true;
};
export default rectangleOverlap;
