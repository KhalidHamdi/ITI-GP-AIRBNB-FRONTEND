import React, { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import axiosInstance from "../../axios";

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState(null);

    const getProperties = async () => {
        try {
            const response = await axiosInstance.get('/api/properties/');
            setProperties(response.data.data);
        } catch (error) {
            setError('Failed to fetch properties..');
        }
    };
    
    useEffect(() => {
        getProperties();
    }, []);

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
