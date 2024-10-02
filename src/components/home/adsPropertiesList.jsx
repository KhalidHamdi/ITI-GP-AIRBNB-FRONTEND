import React, { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem"; // Assuming this is the component that renders a single property item
import axiosInstance from "../../axios"; // Adjust the path if necessary

const AdsPropertiesList = () => {
  const [advertisedProperties, setAdvertisedProperties] = useState([]);
  const [error, setError] = useState(null);

  const fetchAdvertisedProperties = async () => {
    try {
      const response = await axiosInstance.get("/api/properties/?is_advertised=true"); // API call to fetch advertised properties
      setAdvertisedProperties(response.data.data); // Assuming data is in `data.data`
    } catch (error) {
      setError("Failed to fetch advertised properties.");
    }
  };

  useEffect(() => {
    fetchAdvertisedProperties(); // Fetch advertised properties on component mount
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container my-4">
      <h2>Featured Advertised Properties</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {advertisedProperties.map((property) => (
          <div key={property.id} className="col">
            <PropertyListItem property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdsPropertiesList;
