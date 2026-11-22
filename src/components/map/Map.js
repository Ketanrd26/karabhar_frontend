import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.scss";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { productApi, sellerApi } from "../../utils/Api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";
// Optional: Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  tooltipAnchor: [16, -28],
});

const getCentroid = (geometry) => {
  let allCoords = [];

  if (geometry.type === "Polygon") {
    allCoords = geometry.coordinates[0];
  } else if (geometry.type === "MultiPolygon") {
    allCoords = geometry.coordinates.flat(2);
  } else {
    return null;
  }

  const total = allCoords.length;
  const [sumLng, sumLat] = allCoords.reduce(
    ([accLng, accLat], [lng, lat]) => [accLng + lng, accLat + lat],
    [0, 0]
  );

  return total > 0 ? [sumLng / total, sumLat / total] : null;
};

const Map = ({ setMapOppend }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [cityData, setCityData] = useState();
  const [prdData, setPrdData] = useState();

  useEffect(() => {
    fetch("/india-states.geojson")
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  const getMapData = async () => {
    try {
      let response;

      response = await sellerApi.get(`api/mapdata/sellerByMap`);

      setCityData(response.data.cities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMapData();
  }, []);

  const getPrdByCity = async (city) => {
    try {
      const response = await productApi.get(
        `api/product/getProductByCity?cityName=${city}`
      );
      setPrdData(response?.data?.data)
      
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToVendors = (value) => {
    window.open(`/search?sub_category=${value}`, "_blank");
  };

  return (
    <div class="map_parent">
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={7}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoJsonData && (
          <>
            <GeoJSON
              data={geoJsonData}
              style={() => ({
                color: "#b14b34", // border color
                weight: 1, // border thickness
                fillOpacity: 0, // make background transparent
                fillColor: "#fff", // or you can skip this if fillOpacity is 0
              })}
            />
            {geoJsonData.features
              .filter(
                (feature) =>
                  Array.isArray(cityData) &&
                  cityData.filter(
                    (city) =>
                      city.toLowerCase() ===
                      feature?.properties?.district?.toLowerCase()
                  ).length > 0
              )
              .map((feature) => {
                const coords = getCentroid(feature.geometry);
                const stateName = feature.properties.district;

                if (!coords || isNaN(coords[0]) || isNaN(coords[1]))
                  return null;

                return (
                  <Marker
                    key={stateName}
                    position={[coords[1], coords[0]]}
                    icon={customIcon}
                    eventHandlers={{
                      click: () => {
                        getPrdByCity(stateName);
                      },
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -10]}>
                      {stateName}
                    </Tooltip>
                    {prdData?.length !== 0 && (
                      <div class="sellerData_content">
                        {prdData &&
                          prdData.map((item, index) => (
                            <div
                              class="item"
                              key={index}
                              onClick={() =>
                                navigateToVendors(item.prd_name)
                              }
                            >
                              {item.prd_name}{" "}
                              <span className="prd_count">
                                {item.count} Products
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </Marker>
                );
              })
              .filter(Boolean)}
          </>
        )}
      </MapContainer>

      <div class="cross_button" onClick={() => setMapOppend(false)}>
        <RxCross2 />
      </div>
    </div>
  );
};

export default Map;
