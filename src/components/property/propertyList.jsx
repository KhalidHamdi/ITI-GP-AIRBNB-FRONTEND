import React, { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import axiosInstance from "../../axios";

const PropertyList = ({ landlord_id = null ,selectedCategory }) => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  const getProperties = async () => {
    let url = "/api/properties/";

    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`;
    }
      
    try {
        console.log(selectedCategory)
      // Construct the URL based on whether a category is selected or not
      const url = selectedCategory
        ? `/api/properties/?category=${selectedCategory}`
          : "/api/properties/";
        console.log(url)
      const response = await axiosInstance.get(url);
      setProperties(response.data.data);
    } catch (error) {
      setError("Failed to fetch properties.");
    }
  };

  useEffect(() => {
    getProperties();
  }, [selectedCategory]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {properties.map((property) => (
          <div key={property.id} className="col">
            <PropertyListItem property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
