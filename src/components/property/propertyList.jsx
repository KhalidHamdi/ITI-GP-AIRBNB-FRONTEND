import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import PropertyListItem from "./PropertyListItem";
import axiosInstance from "../../axios";

const PropertyList = ({ landlord_id = null, selectedCategory, filteredProperties }) => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();

    const getProperties = async () => {
        let url = "/api/properties/";

        if (landlord_id) {
            url += `?landlord_id=${landlord_id}`;
        }

        try {
            if (filteredProperties || location.state?.properties) {
                setProperties(filteredProperties || location.state.properties);
            } else {
                const response = await axiosInstance.get(
                    selectedCategory ? `/api/properties/?category=${selectedCategory}` : url
                );
                setProperties(response.data.data);
            }
        } catch (error) {
            setError("Failed to fetch properties.");
        }
    };

    useEffect(() => {
        if (!filteredProperties && !location.state?.properties) {
            getProperties();
        } else {
            setProperties(filteredProperties || location.state.properties);
        }
    }, [selectedCategory, filteredProperties, location.state?.properties]);

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
