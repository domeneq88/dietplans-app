import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import CalculatorPage from '../components/CalculatorPage';
import AddProductPage from '../components/AddProductPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AccountPage from '../components/AccountPage';
import EditAccountPage from '../components/EditAccountPage'



export const history = createHistory();


const AppRouter = () => ( 
    <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}/>
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/createproduct" component={AddProductPage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <PrivateRoute path="/calculator" component={CalculatorPage} />
        <PrivateRoute path="/account" component={AccountPage} />
        <PrivateRoute path="/edit_account" component={EditAccountPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
