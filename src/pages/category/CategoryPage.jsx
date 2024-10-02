import React, { useState, useEffect } from 'react';
import Categories from '../../components/home/Categories'; 
import PropertyList from '../../components/property/propertyList';
import { useLocation } from 'react-router-dom';

const PropertyContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(null);

  // Get state from the previous page (FilterModal) using useLocation
  const location = useLocation();

  useEffect(() => {
    // If there are filtered properties passed via the location state, update the state
    if (location.state?.properties) {
      setFilteredProperties(location.state.properties);
    }
  }, [location.state?.properties]);

  const updateSelectedCategory = (category) => {
    setSelectedCategory(category);
    setFilteredProperties(null);
  };

  return (
    <div>
      <Categories 
        dataCategory={selectedCategory} 
        updateSelectedCategory={updateSelectedCategory} 
      />
      <PropertyList 
        selectedCategory={selectedCategory} 
        updateSelectedCategory={updateSelectedCategory}
        filteredProperties={filteredProperties} 
      />
    </div>
  );
};

export default PropertyContainer;
