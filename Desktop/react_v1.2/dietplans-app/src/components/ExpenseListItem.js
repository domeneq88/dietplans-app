import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ id, description, makroW, makroB, makroT, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
    </div>
    <h3 className="list-item__data">{`B: ${makroB / 100} W: ${makroW / 100} T: ${makroT / 100}`}</h3>
    <h3 className="list-item__data">{numeral(amount / 100).format('0')} kcal</h3>
  </Link>
);

export default ExpenseListItem;
