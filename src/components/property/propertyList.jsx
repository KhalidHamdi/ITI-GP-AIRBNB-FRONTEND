import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import to use location state
import PropertyListItem from "./PropertyListItem";
import axiosInstance from "../../axios";

const PropertyList = ({ landlord_id = null, selectedCategory, filteredProperties }) => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation(); // To access state passed through routing

    // Fetch properties based on conditions
    const getProperties = async () => {
        let url = "/api/properties/";

        if (landlord_id) {
            url += `?landlord_id=${landlord_id}`;
        }

        try {
            // If filtered properties are passed through props or routing, use them
            if (filteredProperties || location.state?.properties) {
                setProperties(filteredProperties || location.state.properties);  // Prioritize filtered properties
            } else {
                // Otherwise, fetch properties based on selected category
                const url = selectedCategory
                    ? `/api/properties/?category=${selectedCategory}`
                    : "/api/properties/";
                const response = await axiosInstance.get(url);
                setProperties(response.data.data);
            }
        } catch (error) {
            setError("Failed to fetch properties.");
        }
    };

    // Only fetch when no filtered properties are provided
    useEffect(() => {
        if (!filteredProperties && !location.state?.properties) {
            getProperties();
        } else {
            setProperties(filteredProperties || location.state.properties);  // Set properties when filtering
        }
    }, [selectedCategory, filteredProperties, location.state?.properties]); // Update effect dependencies

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container my-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {properties.map(property => (
                    <div key={property.id} className="col">
                        <PropertyListItem property={property} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyList;
