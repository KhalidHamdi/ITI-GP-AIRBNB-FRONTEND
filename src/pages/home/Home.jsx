import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import Categories from "../../components/home/Categories";
import PropertyList from "../../components/property/propertyList";
import "./Home.css";
import "../../components/Reservations/ReservationSidebar";
// import AdComponent from "../../components/ads/AdComponent";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const messageParam = params.get("message");

    if (messageParam) {
      if (messageParam === "Payment successful") {
        toast.success("Payment successful");
      } else {
        toast.error("Payment failed");
      }

      params.delete("message");
      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
        },
        { replace: true }
      );
    }
  }, [location, navigate]);

  return (
    <div className="home">
      {/* <AdComponent/> */}
      <Categories />
      <PropertyList />
    </div>
  );
};

export default Home;
