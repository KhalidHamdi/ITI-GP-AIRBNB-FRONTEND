import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { slug } = useParams();

  return (
    <div>
      <h1>Category: {slug}</h1>
    </div>
  );
};

export default CategoryPage;