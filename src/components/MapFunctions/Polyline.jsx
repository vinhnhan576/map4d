import React from "react";
import "./MapFunctions.css";
import onFunctionClick from "./onFunctionClick";

const Polyline = () => {
	return (
		<div className="map-util" onClick={() => onFunctionClick(1)}>
			<img src="https://cdn-icons-png.flaticon.com/512/74/74091.png" alt="" />
		</div>
	);
};

export default Polyline;
