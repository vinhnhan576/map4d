import React from "react";
import "./MapFunctions.css";
import onFunctionClick from "./onFunctionClick";

const Polygon = () => {
	return (
		<div className="map-util" onClick={() => onFunctionClick(2)}>
			<img
				src="https://cdn-icons-png.flaticon.com/512/7168/7168063.png"
				alt=""
			/>
		</div>
	);
};

export default Polygon;
