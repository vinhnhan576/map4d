import React from "react";
import "./MapFunctionsInfo.css";

const MarkerInfo = ({ markerInfo, poiInfo }) => {
	return (
		<>
			<div className="map-position-info" ref={markerInfo}>
				<div style={{ display: "flex" }}>
					<div style={{ paddingRight: "5px" }}>Kinh độ (X): </div>
					<div className="map-position-info-location"></div>
				</div>
				<div style={{ display: "flex" }}>
					<div style={{ paddingRight: "5px" }}>Vĩ độ (Y): </div>
					<div className="map-position-info-location"></div>
				</div>
			</div>
			<div id="info" ref={poiInfo}>
				<div id="title"></div>
				<div id="subtitle"></div>
			</div>
		</>
	);
};

export default MarkerInfo;
