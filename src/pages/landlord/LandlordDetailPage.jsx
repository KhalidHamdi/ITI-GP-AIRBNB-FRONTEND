// src/pages/LandlordDetailPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import ContactButton from "../../components/ContactButton";
import PropertyList from "../../components/property/propertyList";
import EditProperty from "../../components/property/EditProperty"; // Import the EditProperty component

const LandlordDetailPage = () => {
    const { id } = useParams();
    const [landlord, setLandlord] = useState(null);
    const [userId, setUserId] = useState(null);
    const [landlordId, setLandlordId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const landlordData = await axiosInstance.get(`/api/auth/${id}/`);
                setLandlord(landlordData.data);
                setLandlordId(landlordData.data.id);
                const currentUserId = localStorage.getItem("userId");
                if (currentUserId) {
                    setUserId(currentUserId);
                } else {
                    console.error("No userId found in localStorage");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!landlord) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container py-4">
            <div className="row">
                {/* Sidebar for Landlord Info */}
                <aside className="col-md-3 mb-4">
                    <div className="card text-center p-4 border-0 shadow-sm">
                        <img
                            src={
                                landlord.avatar ||
                                "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
                            }
                            alt={landlord.username}
                            width="200"
                            height="200"
                            className="img-fluid rounded mx-auto d-block"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg";
                            }}
                        />

                        <h1 className="mt-3 h4">{landlord.username}</h1>

                        {userId !== landlordId && (
                            <ContactButton userId={userId} landlordId={landlordId} />
                        )}
                    </div>
                </aside>

                {/* Main Section for Property Listings */}
                <div className="col-md-9">
                    <h2 className="mb-4">Your Properties</h2>
                    <PropertyList landlord_id={id} isLandlordPage={true} />
                </div>

                {/* Include the EditProperty modal */}
                <EditProperty />
            </div>
        </div>
    );
};

export default LandlordDetailPage;
