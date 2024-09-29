import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import ContactButton from "../../components/ContactButton";
import PropertyList from "../../components/property/propertyList";

const LandlordDetailPage = () => {
  const { username } = useParams();
  const [landlord, setLandlord] = useState(null);
  const [userId, setUserId] = useState(null);
  const [landlordId, setLandlordId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landlordData = await axiosInstance.get(`/api/auth/${username}`);
        setLandlord(landlordData.data);
        setLandlordId(landlordData.data.id);
        // const currentUserId = sessionStorage.getItem("userId");
        const currentUserId = "3bd4857d-edca-4ab2-b3ac-2c976e5f14f4";
        setUserId(currentUserId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Landlord data", landlord);
  console.log("User id", userId);
  console.log("Landlord id", landlordId);

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
              src={landlord.avatar_url}
              alt={landlord.username}
              width="200"
              height="200"
              className="rounded-circle mx-auto"
            />

            <h1 className="mt-3 h4">{landlord.username}</h1>

            {userId !== landlordId && (
              <ContactButton userId={userId} landlordId={landlordId} />
            )}
          </div>
        </aside>

        {/* Main Section for Property Listings */}
        <PropertyList landlord_username={username} />
      </div>
    </div>
  );
};

export default LandlordDetailPage;
