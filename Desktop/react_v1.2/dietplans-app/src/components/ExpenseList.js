import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
import { firebase } from '../firebase/firebase'

export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Plan diety</div>
      <div className="show-for-desktop">Posiłki</div>
      <div className="show-for-desktop">Makro</div>
      <div className="show-for-desktop">kcal</div>
    </div>
    <div className="list-body">
      {
        (props.expenses.length === 0) ? (
          <div className="list-item list-item--message">
            <span>Brak planu żywieniowego</span>
          </div>
        ) : (
            props.expenses.map((expense) => {
              return <ExpenseListItem key={expense.id} {...expense} />;
            })
          )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
