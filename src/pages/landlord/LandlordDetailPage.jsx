import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import ContactButton from "../../components/ContactButton";
import PropertyList from "../../components/property/propertyList";

const LandlordDetailPage = () => {
  const { id } = useParams();
  const [landlord, setLandlord] = useState(null);
  const [userId, setUserId] = useState(null);
  const [landlordId, setLandlordId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landlordData = await axiosInstance.get(`/api/auth/${id}`);
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
        <PropertyList landlord_id={id} />
      </div>
      <div className="advertising" style={{
          marginTop: "10px",
          marginBottom: "20px",
      }}>
        <hr />
        <h4 style={{
          textAlign: 'center'
        }}>advertise  your property</h4>
        <button className="btn btn-primary w-80 py-2" onClick={{}}>ads Your Property here</button>
      </div>
    </div>
  );
};

export default LandlordDetailPage;
