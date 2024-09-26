import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
// import ContactButton from "../components/ContactButton";
import PropertyList from "../../components/property/propertyList";

const LandlordDetailPage = () => {
  const { id } = useParams();
  const [landlord, setLandlord] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landlordData = await axiosInstance.get(`/api/auth/${id}`);
        setLandlord(landlordData);
        const currentUserId = await axiosInstance.get("/api/auth/userid");
        setUserId(currentUserId);
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
              src={landlord.avatar_url}
              alt={landlord.name}
              width="200"
              height="200"
              className="rounded-circle mx-auto"
            />

            <h1 className="mt-3 h4">{landlord.name}</h1>

            {/* {userId !== id && <ContactButton userId={userId} landlordId={id} />} */}
          </div>
        </aside>

        {/* Main Section for Property Listings */}
        <div className="col-md-9">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <PropertyList landlord_id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDetailPage;
