
import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Categories from '../../components/home/Categories';
import "./Home.css";
import PropertyList from '../../components/property/propertyList';


const Home = () => {
  return (
    <div className="home">
      <Header />
      <Categories />
      <PropertyList></PropertyList>
      <Footer />
    </div>
  );
};

export default Home;
