import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import { firebase } from '../firebase/firebase'


export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'posiłku' : 'posiłków';
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('0');
  const isAdmin = firebase.auth().currentUser.uid === "t2b5rW2XO6a1a3SjMsokxQ9c4xg1" ? true : false;
  return (
    <div className="page-header">
      <div className="content-container">
        <h2 className="page-header__title">Witaj <span>{firebase.auth().currentUser.displayName}</span>!</h2>
        <h1 className="page-header__title">Suma <span>{expenseCount}</span> {expenseWord} wynosi <span>{formattedExpensesTotal} kcal</span></h1>
        {
          isAdmin &&
          <div className="page-header__actions">
            <Link className="button" to="/create">Dodaj posiłek</Link>
          </div>
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
