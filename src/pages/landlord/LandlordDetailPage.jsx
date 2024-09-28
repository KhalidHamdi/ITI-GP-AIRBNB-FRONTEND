import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
// import ContactButton from "../components/ContactButton";
import PropertyList from "../../components/property/propertyList";

const LandlordDetailPage = () => {
  const { username } = useParams();
  const [landlord, setLandlord] = useState(null);
  const [userId, setUserId] = useState(null);
  console.log("Landlord data", landlord);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landlordData = await axiosInstance.get(`/api/auth/${username}`);
        setLandlord(landlordData.data);
        // const currentUserId = sessionStorage.getItem("userId");
        // setUserId(currentUserId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

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

            {/* {userId !== id && <ContactButton userId={userId} landlordId={id} />} */}
          </div>
        </aside>

        {/* Main Section for Property Listings */}
        <PropertyList landlord_id={username} />
      </div>
    </div>
  );
};

export default LandlordDetailPage;