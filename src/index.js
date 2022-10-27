/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import options from "./config/MapOption";

const root = ReactDOM.createRoot(document.getElementById("root"));
const map = new map4d.Map(document.getElementById("map"), options);
map.setMapType(map4d.MapType.raster);
const Context = React.createContext("Default value");

root.render(
	// <React.StrictMode>
	<Context.Provider value={map}>
		<App />
	</Context.Provider>
	// </React.StrictMode>
);

export default Context;
