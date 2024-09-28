import React from "react";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import Categories from "../../components/home/Categories";
import "./Home.css";
import PropertyList from "../../components/property/propertyList";
import AddProperty from "../../components/property/addProperty";
import "../../components/Reservations/ReservationSidebar";

import { useLocation } from 'react-router-dom';


const Home = () => {

  const location = useLocation();
  const filteredProperties = location.state?.properties; // Get filtered properties from location state


  return (
    <div className="home">
      <Categories />
      <PropertyList  filteredProperties={filteredProperties}/>
    </div>
  );
};

export default Home;
