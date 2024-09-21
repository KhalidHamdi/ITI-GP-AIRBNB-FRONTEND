
import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Categories from '../../components/home/Categories';
import "./Home.css";
import PropertyList from '../../components/property/propertyList';
import AddProperty from '../../components/property/addProperty';



const Home = () => {
  return (
    <div className="home">
      <Categories />
      <PropertyList/>
    </div>
  );
};

export default Home;
