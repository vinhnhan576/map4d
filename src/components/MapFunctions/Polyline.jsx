import React from "react";
import { useContext } from "react";
import Context from "../..";
import "./MapFunctions.css";
import onFunctionClick from "./onFunctionClick";

const Polyline = () => {
	const map = useContext(Context);

	return (
		<div className="map-util" onClick={() => onFunctionClick(1, map)}>
			<img src="https://cdn-icons-png.flaticon.com/512/74/74091.png" alt="" />
		</div>
	);
};

export default Polyline;
