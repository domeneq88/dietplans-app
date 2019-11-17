import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: props.product ? props.product.productName : '',
      productMakroB: props.product ? (props.product.productMakroB / 100).toString() : '',
      productMakroW: props.product ? (props.product.productMakroB / 100).toString() : '',
      productMakroT: props.product ? (props.product.productMakroT / 100).toString() : '',
      amount: props.product ? (props.product.amount / 100).toString() : '',
      createdAt: props.product ? moment(props.product.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    };
  
  }
  onProductNameChange = (e) => {
    const productName = e.target.value;
    this.setState(() => ({ productName }));
  };
  onProductMakroBChange = (e) => {
    const productMakroB = e.target.value;
    
    if (!productMakroB || productMakroB.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ productMakroB }));
    }
  };
  onProductMakroWChange = (e) => {
    const productMakroW = e.target.value;
    
    if (!productMakroW || productMakroW.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ productMakroW }));
    }
  };
  onProductMakroTChange = (e) => {
    const productMakroT = e.target.value;
    
    if (!productMakroT || productMakroT.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ productMakroT }));
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

    if (!this.state.productName || !this.state.productMakroB || !this.state.productMakroW || !this.state.productMakroT) {
      this.setState(() => ({ error: 'Wprowadź produkt i jego makroskładniki zawarte w 100g produktu' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        productName: this.state.productName,
        productMakroB: parseFloat(this.state.productMakroB, 10) * 100,
        productMakroW: parseFloat(this.state.productMakroW, 10) * 100,
        productMakroT: parseFloat(this.state.productMakroT, 10) * 100,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  };

  
  render() {
      return (
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input
            type="text"
            placeholder="Produkt"
            autoFocus
            className="text-input"
            value={this.state.productName}
            onChange={this.onProductNameChange}
          />
          <input
            type="text"
            placeholder="Białko"
            className="text-input"
            value={this.state.productMakroB}
            onChange={this.onProductMakroBChange}
          />
          <input
            type="text"
            placeholder="Węglowodany"
            className="text-input"
            value={this.state.productMakroW}
            onChange={this.onProductMakroWChange}
          />
          <input
            type="text"
            placeholder="Tłuszcze"
            className="text-input"
            value={this.state.productMakroT}
            onChange={this.onProductMakroTChange}
          />
          <input
            type="text"
            placeholder="kcal"
            className="text-input"
            value={this.state.amount=this.state.productMakroB*4+this.state.productMakroW*4+this.state.productMakroT*9}
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
          <div>
            <button className="button">Zapisz produkt</button>
          </div>
        </form>
      )
    
  }
}
