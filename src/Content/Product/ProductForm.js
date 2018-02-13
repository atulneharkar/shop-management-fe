import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../_actions';
import { required } from '../../_helpers';
import { renderInputField, renderSelectField } from '../../_components';
import loaderImg from '../../assets/images/loader.gif';

class ProductForm extends Component {
  constructor(props) {
		super(props);

		this.state = {
			submitButtonText: 'Save',
			productId: '',
			productData: {
				productName: '',
				productCategory: '',
				productDescription: ''
			}
		}
	}

	componentWillMount() {
		this.props.getProductCategory();

		const productId = this.props.match.params.productId;
    if(productId) {
    	this.setState({ productId, submitButtonText: 'Update' });
    	this.props.getProductById(productId);
    }
  }

  componentWillReceiveProps(nextProps) {
  	if(nextProps.productData && this.props.match.params.productId) {
    	this.setState({ productData: nextProps.productData });
    }
  }

	renderProductResponse() {
		if(this.props.productLoading) {
			return <div className="loader">
				<div className="loader-overlay"></div>
				<img src={loaderImg} className="loader-img" alt="loader" />
			</div>;
		} else if(this.props.productErrorMessage) {
			return <div className="error-message">{this.props.productErrorMessage}</div>;
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

    const productData = this.state.productData;
    productData[key] = value;
    this.setState(productData);
  }

	handleFormSubmit(props) {
		if(this.state.productData.productCategory) {
			props['productCategory'] = this.state.productData.productCategory;
		}
    if(this.state.productId) {
      this.props.updateProduct(this.state.productId, props);
    } else {
      this.props.addProduct(props);
    }
  }

  render() {
		const { handleSubmit } = this.props;

		return (
		  <div className="product-form wrapper">
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				  <p className="form-title">Product</p>
					<Field
		        name="productName"
		        type="text"
		        component={renderInputField}
		        label="Product Name"
		        setValue={this.state.productData.productName}
		        onValueChange={(e) => this.handleInputChange(e)}
		        validate={this.state.productData.productName ? null : [required]}
		      />
		      <Field
		        name="productCategory"
		        component={renderSelectField}
		        label="Category"
		        optionList={this.props.productCategory}
		        setValue={this.state.productData.productCategory}
		        onValueChange={(e) => this.handleInputChange(e, 'productCategory')}
		        // validate={[required]}
		      />
		      <Field
		        name="productDescription"
		        type="text"
		        component={renderInputField}
		        label="Description"
		        setValue={this.state.productData.productDescription || ''}
		        onValueChange={(e) => this.handleInputChange(e)}
		      />
		      <div>
		        <button type="submit" className="submit-btn-link">{this.state.submitButtonText}</button>

		        <div className="admin-dashboard-link">
		          Back to <Link to="/">Products</Link>
		        </div>
		      </div>

		      {this.renderProductResponse()}
				</form>
			</div>
		);
  }
}

const mapStateToProps = (state) => ({
	productData: state.product.productDetail,
  productErrorMessage: state.product.productError,
  productLoading: state.product.productLoading,
  productCategory: state.product.productCategory
});

ProductForm = connect(
  mapStateToProps,
  actions
)(ProductForm);

export default reduxForm({
  form: 'ProductForm'
})(ProductForm);
