import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../_actions';
import { required } from '../../_helpers';
import { renderInputField } from '../../_components';
import loaderImg from '../../assets/images/loader.gif';

class CategoryForm extends Component {
  constructor(props) {
		super(props);

		this.state = {
			submitButtonText: 'Save',
			categoryId: '',
			categoryData: {
				name: ''
			}
		}
	}

	componentWillMount() {
		const categoryId = this.props.match.params.categoryId;
    if(categoryId) {
    	this.setState({ categoryId, submitButtonText: 'Update' });
    	this.props.getCategoryById(categoryId);
    }
  }

  componentWillReceiveProps(nextProps) {
  	if(nextProps.categoryData && this.props.match.params.categoryId) {
    	this.setState({ categoryData: nextProps.categoryData });
    }
  }

	renderCategoryResponse() {
		if(this.props.categoryLoading) {
			return <div className="loader">
				<div className="loader-overlay"></div>
				<img src={loaderImg} className="loader-img" alt="loader" />
			</div>;
		} else if(this.props.categoryErrorMessage) {
			return <div className="error-message">{this.props.categoryErrorMessage}</div>;
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

    const categoryData = this.state.categoryData;
    categoryData[key] = value;
    this.setState(categoryData);
  }

	handleFormSubmit(props) {
    if(this.state.categoryId) {
      this.props.updateCategory(this.state.categoryId, props);
    } else {
      this.props.addCategory(props);
    }
  }

  render() {
		const { handleSubmit } = this.props;

		return (
		  <div className="category-form wrapper">
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				  <p className="form-title">Category</p>
					<Field
		        name="name"
		        type="text"
		        component={renderInputField}
		        label="Name"
		        setValue={this.state.categoryData.name}
		        onValueChange={(e) => this.handleInputChange(e)}
		        validate={this.state.categoryData.name ? null : [required]}
		      />
		      <div>
		        <button type="submit" className="submit-btn-link">{this.state.submitButtonText}</button>

		        <div className="admin-dashboard-link">
		          Back to <Link to="/categories">Categories</Link>
		        </div>
		      </div>

		      {this.renderCategoryResponse()}
				</form>
			</div>
		);
  }
}

const mapStateToProps = (state) => ({
	categoryData: state.category.categoryDetail,
  categoryErrorMessage: state.category.categoryError,
  categoryLoading: state.category.categoryLoading,
  admin: state.authentication.isAdmin
});

CategoryForm = connect(
  mapStateToProps,
  actions
)(CategoryForm);

export default reduxForm({
  form: 'CategoryForm'
})(CategoryForm);
