import React from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase/firebase'
import database from '../firebase/firebase'

export default class AccountPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userAccount: []
    }
}

componentDidMount() {
  const uid = firebase.auth().currentUser.uid
  console.log(uid)
  database.ref(`usersAccounts/${uid}`)
   .on('value', (snapshot) => {
     let users = snapshot.val();
     let newState = []
     for(let user in users) {
       newState.push({
         wiek: users[user].wiek,
         waga: users[user].waga,
         wzrost: users[user].wzrost
       })
     }
     this.setState({
       userAccount: newState
     })
     console.log(this.state.userAccount)
   })
}
  
  render() {
      return (
          <div>
            <div className="page-header">
              <div className="content-container">
                <h1 className="page-header__title">Konto: <span>{firebase.auth().currentUser.displayName}</span></h1>
              </div>
            </div>
            <div className="content-container">
              <div className="input-group">
                <h3 className="page-header__title">Adres email: <span>{firebase.auth().currentUser.email}</span></h3>
              </div>
              <div className="input-group">
                <h3 className="page-header__title">Imię: <span>{firebase.auth().currentUser.displayName.slice(0, firebase.auth().currentUser.displayName.indexOf(' '))}</span></h3>
              </div>
              <div className="input-group">
                <h3 className="page-header__title">Nazwisko: <span>{firebase.auth().currentUser.displayName.split(/[  ]+/).pop()}</span></h3>
              </div>
            </div>
          </div>
      )
    }
  }
