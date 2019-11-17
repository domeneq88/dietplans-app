import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { firebase } from '../firebase/firebase'

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>DietPlans</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
        <Link to="/account">
          <img className="img" src={firebase.auth().currentUser.photoURL} alt="Logout"/>
        </Link>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
