import React from 'react';
import ProductSummary from './ProductList';
import ProductList from './ProductSummary';
import ProductListFilters  from './ProductListFilters';

const CalculatorPage = () => (
  <div>
    <ProductList />
    <ProductSummary />
  </div>
);

export default CalculatorPage;
