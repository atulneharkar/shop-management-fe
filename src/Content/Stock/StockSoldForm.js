import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import * as actions from '../../_actions';
import { required } from '../../_helpers';
import { renderInputField } from '../../_components';
import loaderImg from '../../assets/images/loader.gif';

class StockSoldForm extends Component {
  constructor(props) {
		super(props);

		this.state = {
			submitButtonText: 'Save',
			stockSoldId: '',
			productId: '',
			stockSoldData: {
				amount: '',
				quantity: '',
				date: ''
			}
		}
	}

	componentWillMount() {
		const stockSoldId = this.props.match.params.soldId;
		const productId = this.props.match.params.productId;
    if(stockSoldId) {
    	this.setState({ stockSoldId, submitButtonText: 'Update' });
    	this.props.getStockSoldById(stockSoldId);
    }
    if(productId) {
    	this.setState({ productId });
    }
  }

  componentWillReceiveProps(nextProps) {
  	if(nextProps.stockSoldData && this.props.match.params.soldId) {
    	this.setState({ stockSoldData: nextProps.stockSoldData });
    }
  }

	renderStockSoldResponse() {
		if(this.props.stockSoldLoading) {
			return <div className="loader">
				<div className="loader-overlay"></div>
				<img src={loaderImg} className="loader-img" alt="loader" />
			</div>;
		} else if(this.props.stockSoldErrorMessage) {
			return <div className="error-message">{this.props.stockSoldErrorMessage}</div>;
		}
	}

	handleInputChange(event, controlName = undefined) {
  	let target;
    let value;
    let key;

  	if(!controlName) {
  		target = event.target;
	    value = target.type === 'checkbox' ? target.checked : target.value;
	    key = target.name;
  	} else {
  		key = controlName;
  		value = event.value;
  	}

    const stockSoldData = this.state.stockSoldData;
    stockSoldData[key] = value;
    this.setState(stockSoldData);
  }

	handleFormSubmit(props) {
    if(this.state.stockSoldId) {
      this.props.updateStockSold(this.state.stockSoldId, props);
    } else {
      this.props.addStockSold(props, this.state.productId);
    }
  }

  render() {
		const { handleSubmit } = this.props;

		return (
		  <div className="stock-sold-form wrapper">
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				  <p className="form-title">Stock Sold</p>
					<Field
		        name="quantity"
		        type="number"
		        component={renderInputField}
		        label="Quantity"
		        setValue={this.state.stockSoldData.quantity}
		        onValueChange={(e) => this.handleInputChange(e)}
		        validate={this.state.stockSoldData.quantity ? null : [required]}
		      />
		      <Field
		        name="amount"
		        type="number"
		        component={renderInputField}
		        label="Amount"
		        setValue={this.state.stockSoldData.amount}
		        onValueChange={(e) => this.handleInputChange(e)}
		        validate={this.state.stockSoldData.amount ? null : [required]}
		      />
		      <Field
		        name="date"
		        type="date"
		        component={renderInputField}
		        label="Date"
		        setValue={Moment(this.state.stockSoldData.date).format('YYYY-MM-DD')}
		        onValueChange={(e) => this.handleInputChange(e)}
		        validate={this.state.stockSoldData.date ? null : [required]}
		      />
		      <div>
		        <button type="submit" className="submit-btn-link">{this.state.submitButtonText}</button>

		        <div className="admin-dashboard-link">
		          Back to <Link to="/">Product List</Link>
		        </div>
		      </div>

		      {this.renderStockSoldResponse()}
				</form>
			</div>
		);
  }
}

const mapStateToProps = (state) => ({
	stockSoldData: state.stockSold.stockSoldDetail,
  stockSoldErrorMessage: state.stockSold.stockSoldError,
  stockSoldLoading: state.stockSold.stockSoldLoading
});

StockSoldForm = connect(
  mapStateToProps,
  actions
)(StockSoldForm);

export default reduxForm({
  form: 'StockSoldForm'
})(StockSoldForm);
