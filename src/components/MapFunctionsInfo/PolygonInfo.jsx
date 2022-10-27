import React from "react";
import "./MapFunctionsInfo.css";

const PolygonInfo = ({ polygonInfo }) => {
	return (
		<div className="map-polygon-info map-position-info" ref={polygonInfo}>
			<div style={{ display: "flex" }}>
				<div>Diện tích: </div>
				<div className="map-polygon-area-info"></div>
			</div>
		</div>
	);
};

export default PolygonInfo;
