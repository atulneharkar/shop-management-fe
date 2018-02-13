import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import * as actions from '../../_actions';
import { required } from '../../_helpers';
import { renderInputField } from '../../_components';
import loaderImg from '../../assets/images/loader.gif';

class StockPurchaseForm extends Component {
  constructor(props) {
		super(props);

		this.state = {
			submitButtonText: 'Save',
			stockPurchaseId: '',
			productId: '',
			stockPurchaseData: {
				amount: '',
				quantity: '',
				date: ''
			}
		}
	}

	componentWillMount() {
		const stockPurchaseId = this.props.match.params.purchaseId;
		const productId = this.props.match.params.productId;
    if(stockPurchaseId) {
    	this.setState({ stockPurchaseId, submitButtonText: 'Update' });
    	this.props.getStockPurchaseById(stockPurchaseId);
    }
    if(productId) {
    	this.setState({ productId });
    }
  }

  componentWillReceiveProps(nextProps) {
  	if(nextProps.stockPurchaseData && this.props.match.params.purchaseId) {
    	this.setState({ stockPurchaseData: nextProps.stockPurchaseData });
    }
  }

	renderStockPurchaseResponse() {
		if(this.props.stockPurchaseLoading) {
			return <div className="loader">
				<div className="loader-overlay"></div>
				<img src={loaderImg} className="loader-img" alt="loader" />
			</div>;
		} else if(this.props.stockPurchaseErrorMessage) {
			return <div className="error-message">{this.props.stockPurchaseErrorMessage}</div>;
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

    const stockPurchaseData = this.state.stockPurchaseData;
    stockPurchaseData[key] = value;
    this.setState(stockPurchaseData);
  }

	handleFormSubmit(props) {
    if(this.state.stockPurchaseId) {
      this.props.updateStockPurchase(this.state.stockPurchaseId, props);
    } else {
      this.props.addStockPurchase(props, this.state.productId);
    }
  }

  render() {
		const { handleSubmit } = this.props;

		return (
		  <div className="stock-purchase-form wrapper">
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				  <p className="form-title">Stock Purchase</p>
					<Field
		        name="quantity"
		        type="number"
		        component={renderInputField}
		        label="Quantity"
		        setValue={this.state.stockPurchaseData.quantity}
		        onValueChange={(e) => this.handleInputChange(e)}
		        validate={this.state.stockPurchaseData.quantity ? null : [required]}
		      />
		      <Field
		        name="amount"
		        type="number"
		        component={renderInputField}
		        label="Amount"
		        setValue={this.state.stockPurchaseData.amount}
		        onValueChange={(e) => this.handleInputChange(e)}
		        validate={this.state.stockPurchaseData.amount ? null : [required]}
		      />
		      <Field
		        name="date"
		        type="date"
		        component={renderInputField}
		        label="Date"
		        setValue={Moment(this.state.stockPurchaseData.date).format('YYYY-MM-DD')}
		        onValueChange={(e) => this.handleInputChange(e)}
		        validate={this.state.stockPurchaseData.date ? null : [required]}
		      />
		      <div>
		        <button type="submit" className="submit-btn-link">{this.state.submitButtonText}</button>

		        <div className="admin-dashboard-link">
		          Back to <Link to="/">Product List</Link>
		        </div>
		      </div>

		      {this.renderStockPurchaseResponse()}
				</form>
			</div>
		);
  }
}

const mapStateToProps = (state) => ({
	stockPurchaseData: state.stockPurchase.stockPurchaseDetail,
  stockPurchaseErrorMessage: state.stockPurchase.stockPurchaseError,
  stockPurchaseLoading: state.stockPurchase.stockPurchaseLoading
});

StockPurchaseForm = connect(
  mapStateToProps,
  actions
)(StockPurchaseForm);

export default reduxForm({
  form: 'StockPurchaseForm'
})(StockPurchaseForm);
