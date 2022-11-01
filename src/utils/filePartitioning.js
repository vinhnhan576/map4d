const filePartitioning = (json) => {
	let MAX_FEATURES = 1000;
	let featureCollections = [];
	let i = 0;
	while (i * MAX_FEATURES <= json.features.length) {
		featureCollections.push({
			type: "FeatureCollection",
			features: json.features.slice(i * MAX_FEATURES, (i + 1) * MAX_FEATURES),
			timeStamp: Date.now,
			crs: {
				type: "name",
				properties: { name: "urn:ogc:def:crs:EPSG::4326" },
			},
		});
		let length =
			featureCollections[featureCollections.length - 1].features.length;
		featureCollections[featureCollections.length - 1].totalFeatures = length;
		featureCollections[featureCollections.length - 1].numberMatched = length;
		featureCollections[featureCollections.length - 1].numberReturned = length;
		i++;
	}
	return featureCollections;
};

export default filePartitioning;
