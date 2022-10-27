import React from "react";
import "./MapFunctions.css";
import intersectImg from "../../images/intersect.png";
import onFunctionClick from "./onFunctionClick";

const Intersect = () => {
	return (
		<div className="map-util" onClick={() => onFunctionClick(3)}>
			<img src={intersectImg} alt="" />
		</div>
	);
};

export default Intersect;
