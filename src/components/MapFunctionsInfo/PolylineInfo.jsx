import React from "react";
import "./MapFunctionsInfo.css";

const PolylineInfo = ({ polylineInfo }) => {
	return (
		<div className="map-polyline-length map-position-info" ref={polylineInfo}>
			<div style={{ display: "flex" }}>
				<div>Chiều dài: </div>
				<div className="map-polyline-length-info"></div>
			</div>
		</div>
	);
};

export default PolylineInfo;
