import React, { useContext, useState } from "react";
import "./LocationHeader.scss";
import { LuLocateFixed } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import { UserContext } from "../../Context";

const LocationHeader = () => {
    const {setPincode} = useContext(UserContext)
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);


  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Optional: Reverse geocoding using OpenStreetMap API
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setPincode(data?.address?.postcode)

          setLocation(data.display_name || `${latitude}, ${longitude}`);
        } catch (error) {
          console.error("Reverse geocoding error:", error);
          setLocation(`${latitude}, ${longitude}`);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        alert("Unable to retrieve your location");
        console.error(error);
        setLoading(false);
      }
    );
  };

  return (
    <div className="parent location-parent">
      <div className="cont location-cont">
        {location && (
          <p>
            <span>
              <IoLocationSharp />
            </span>
            {location}
          </p>
        )}
        <div className="location-wrap" onClick={handleGetLocation}>
          <LuLocateFixed />
          <input
            placeholder="Use my current location"
            value={loading ? "Detecting location..." : location}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default LocationHeader;
