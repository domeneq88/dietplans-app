import React from 'react';
import moment from 'moment';
import { firebase } from '../firebase/firebase'
import { SingleDatePicker } from 'react-dates';
import database from '../firebase/firebase'

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      description: props.expense ? props.expense.description : '',
      meal: props.expense ? props.expense.meal : '',
      note: props.expense ? props.expense.note : '',
      makroB: props.expense ? (props.expense.makroB / 100).toString() : '',
      makroW: props.expense ? (props.expense.makroW / 100).toString() : '',
      makroT: props.expense ? (props.expense.makroT / 100).toString() : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      userId: '',
      usersIdAccount: [],
      error: ''
  };
}
  componentDidMount() {
    database.ref('usersAccounts')
     .on('value', (snapshot) => {
       let users = snapshot.val();
       let newState = []
       for(let user in users) {
         newState.push({
           id: users[user].id,
           name: users[user].name
         })
       }
       this.setState({
         usersIdAccount: newState
       })
     })
     
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onMealChange = (e) => {
    const meal = e.target.value;
    this.setState(() => ({ meal }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onUserIdChange = (e) => {
    const userId = e.target.value;
    this.setState(() => ({ userId }));
  };
  onMakroBChange = (e) => {
    const makroB = e.target.value;
    
    if (!makroB || makroB.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ makroB }));
    }
  };
  onMakroWChange = (e) => {
    const makroW = e.target.value;
    
    if (!makroW || makroW.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ makroW }));
    }
  };
  onMakroTChange = (e) => {
    const makroT = e.target.value;
    
    if (!makroT || makroT.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ makroT }));
    }
  };
  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.makroB || !this.state.makroW || !this.state.makroT) {
      this.setState(() => ({ error: 'Wprowadź posiłek i jego makro' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        meal: this.state.meal,
        makroB: parseFloat(this.state.makroB, 10) * 100,
        makroW: parseFloat(this.state.makroW, 10) * 100,
        makroT: parseFloat(this.state.makroT, 10) * 100,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
        userId: this.state.userId
      });
    }
  };

  
  render() {
    const isAdmin = firebase.auth().currentUser.uid === "t2b5rW2XO6a1a3SjMsokxQ9c4xg1" ? true : false;
    if(isAdmin) {
      return (
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input
            type="text"
            placeholder="Który posiłek"
            autoFocus
            className="text-input"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Opis posiłku"
            className="text-input"
            value={this.state.meal}
            onChange={this.onMealChange}
          />
          <input
            type="text"
            placeholder="Białko"
            className="text-input"
            value={this.state.makroB}
            onChange={this.onMakroBChange}
            
          />
          <input
            type="text"
            placeholder="Węglowodany"
            className="text-input"
            value={this.state.makroW}
            onChange={this.onMakroWChange}
            
          />
          <input
            type="text"
            placeholder="Tłuszcze"
            className="text-input"
            value={this.state.makroT}
            onChange={this.onMakroTChange}
            
          />
          <input
            type="text"
            placeholder="kcal"
            className="text-input"
            value={this.state.amount=this.state.makroB*4+this.state.makroW*4+this.state.makroT*9}
            onChange={this.onAmountChange}
            disabled
          />
          
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <select 
            value={this.state.userId} 
            onChange={this.onUserIdChange}
            className="text-input"
          >
          {this.state.usersIdAccount.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
          <textarea
            placeholder="Dodaj uwagi do posiłku"
            className="textarea"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <div>
            <button className="button">Zapisz posiłek</button>
          </div>
        </form>
      )
    } else {
      return (
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input
            type="text"
            placeholder="Który posiłek"
            autoFocus
            className="text-input"
            value={this.state.description}
            onChange={this.onDescriptionChange}
            disabled
          />
          <input
            type="text"
            placeholder="Opis posiłku"
            autoFocus
            className="text-input"
            value={this.state.meal}
            onChange={this.onMealChange}
            disabled
          />
          <input
            type="text"
            placeholder="Białko"
            className="text-input"
            value={this.state.makroB}
            onChange={this.onMakroBChange}
            disabled
          />
          <input
            type="text"
            placeholder="Węglowodany"
            className="text-input"
            value={this.state.makroW}
            onChange={this.onMakroWChange}
            disabled
          />
          <input
            type="text"
            placeholder="Tłuszcze"
            className="text-input"
            value={this.state.makroT}
            onChange={this.onMakroTChange}
            disabled
          />
          <input
            type="text"
            placeholder="kcal"
            className="text-input"
            value={this.state.amount=this.state.makroB*4+this.state.makroW*4+this.state.makroT*9}
            onChange={this.onAmountChange}
            disabled
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
            disabled
          />
          <textarea
            placeholder="Uwagi do posiłku"
            className="textarea"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <div>
            <button className="button">Zapisz posiłek</button>
          </div>
        </form>
      )
    }
  }
}
