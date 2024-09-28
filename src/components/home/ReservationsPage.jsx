import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import "./ReservationsPage.css";

const MyReservationsPage = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/myreservations/");
        setReservations(response.data); 
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
  
    fetchReservations();
  }, []);

  // const reservations = [
  //   {
  //     id: 1,
  //     property: {
  //       id: 101,
  //       title: "Beachfront Villa",
  //       image_url: "https://via.placeholder.com/150",
  //     },
  //     start_date: "2024-10-01",
  //     end_date: "2024-10-07",
  //     number_of_nights: 6,
  //     total_price: 1200,
  //   },
  //   {
  //     id: 2,
  //     property: {
  //       id: 102,
  //       title: "Mountain Cabin",
  //       image_url: "https://via.placeholder.com/150",
  //     },
  //     start_date: "2024-11-15",
  //     end_date: "2024-11-18",
  //     number_of_nights: 3,
  //     total_price: 450,
  //   },
  // ];

  //   return (
  //     <main className="max-w-[1500px] mx-auto px-6 pb-6">
  //       <h1 className="my-6 ms-4 text-2xl">My reservations</h1>

  //       <div className="space-y-4">
  //         {reservations.map((reservation) => (
  //           <div
  //             key={reservation.id}
  //             className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
  //           >
  //             <div className="col-span-1">
  //               <div className="relative overflow-hidden aspect-square rounded-xl">
  //                 <img
  //                   src={reservation.property.image_url}
  //                   className="hover:scale-110 object-cover transition h-full w-full"
  //                   alt="Beach house"
  //                 />
  //               </div>
  //             </div>

  //             <div className="col-span-1 md:col-span-3">
  //               <h2 className="mb-4 text-xl">{reservation.property.title}</h2>

  //               <p className="mb-2">
  //                 <strong>Check-in date:</strong> {reservation.start_date}
  //               </p>
  //               <p className="mb-2">
  //                 <strong>Check-out date:</strong> {reservation.end_date}
  //               </p>

  //               <p className="mb-2">
  //                 <strong>Number of nights:</strong>{" "}
  //                 {reservation.number_of_nights}
  //               </p>
  //               <p className="mb-2">
  //                 <strong>Total price:</strong> ${reservation.total_price}
  //               </p>

  //               <Link
  //                 to={`/properties/${reservation.property.id}`}
  //                 className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl"
  //               >
  //                 Go to property
  //               </Link>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </main>
  //   );
  return (
    <main className="container py-4">
      <h1 className="mb-4 h3">My Reservations</h1>

      <div className="row gy-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="col-12">
            <div className="card shadow-sm border-0 rounded-lg">
              <div className="row g-0">
                {/* Image Section */}
                <div className="col-md-3">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={reservation.property.image_url}
                      className="img-fluid hover-zoom"
                      alt={reservation.property.title}
                    />
                  </div>
                </div>

                {/* Details Section */}
                <div className="col-md-9">
                  <div className="card-body">
                    <h5 className="card-title mb-3">
                      {reservation.property.title}
                    </h5>

                    <p className="mb-2">
                      <strong>Check-in date:</strong> {reservation.start_date}
                    </p>
                    <p className="mb-2">
                      <strong>Check-out date:</strong> {reservation.end_date}
                    </p>
                    <p className="mb-2">
                      <strong>Number of nights:</strong>{" "}
                      {reservation.number_of_nights}
                    </p>
                    <p className="mb-2">
                      <strong>Total price:</strong> ${reservation.total_price}
                    </p>

                    <Link
                      to={`/properties/${reservation.property.id}`}
                      className="custom-btn mt-3 btn"
                    >
                      Go to property
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyReservationsPage;
