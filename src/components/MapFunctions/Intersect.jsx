import React, { useContext } from "react";
import "./MapFunctions.css";
import intersectImg from "../../images/intersect.png";
import onFunctionClick from "./onFunctionClick";
import Context from "../..";

const Intersect = () => {
	const map = useContext(Context);

	return (
		<div className="map-util" onClick={() => onFunctionClick(3, map)}>
			<img src={intersectImg} alt="" />
		</div>
	);
};

export default Intersect;
