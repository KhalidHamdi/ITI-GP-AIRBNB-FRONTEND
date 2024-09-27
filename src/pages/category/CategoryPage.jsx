import React, { useState } from 'react';
import Categories from '../../components/home/Categories'; 
import PropertyList from '../../components/property/propertyList';

const PropertyContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const updateSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Categories 
        dataCategory={selectedCategory} 
        updateSelectedCategory={updateSelectedCategory} 
      />
      <PropertyList selectedCategory={selectedCategory} />
    </div>
  );
};

export default PropertyContainer;
