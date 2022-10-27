function collisionCheckCircleRect(distx, disty, halfWidth, halfHeight, radius) {
distx -= halfWidth;
disty -= halfHeight;
	if (distx > halfWidth + radius) {
		return false;
	}
	if (disty > halfHeight + radius) {
		return false;
	}

	if (distx <= halfWidth) {
		return true;
	}
	if (disty <= halfHeight) {
		return true;
	}

	var hypot =
		(distx - halfWidth) * (distx - halfWidth) +
		(disty - halfHeight) * (disty - halfHeight);

	return hypot <= radius * radius;
}

export default collisionCheckCircleRect;