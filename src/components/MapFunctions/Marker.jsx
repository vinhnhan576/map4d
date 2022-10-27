import React from "react";
import "./MapFunctions.css";
import onFunctionClick from "./onFunctionClick";

const Marker = () => {
	return (
		<div className="map-util" onClick={() => onFunctionClick(0)}>
			<img
				src="https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_map_pointer-512.png"
				alt=""
			/>
			
			{/* <div id="info" ref={infoWindow}>
				<div id="title"></div>
				<div id="subtitle"></div>
			</div> */}
		</div>
	);
};

export default Marker;
