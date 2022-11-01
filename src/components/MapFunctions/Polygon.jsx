import React, { useContext } from "react";
import Context from "../..";
import "./MapFunctions.css";
import onFunctionClick from "./onFunctionClick";

const Polygon = () => {
	const map = useContext(Context);

	return (
		<div className="map-util" onClick={() => onFunctionClick(2, map)}>
			<img
				src="https://cdn-icons-png.flaticon.com/512/7168/7168063.png"
				alt=""
			/>
		</div>
	);
};

export default Polygon;
