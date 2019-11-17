import React from 'react';
import { connect } from 'react-redux';
import ProductListItem from './ProductListItem';
import selectExpenses from '../selectors/expenses';

export const ProductList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        props.products.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No expenses</span>
          </div>
        ) : (
            props.products.map((product) => {
              return <ProductListItem key={product.id} {...product} />;
            })
          )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    products: selectExpenses(state.products, state.filters)
  };
};

export default connect(mapStateToProps)(ProductList);
