import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../_actions';
import { required, email } from '../_helpers';
import { renderInputField } from '../_components';
import loaderImg from '../assets/images/loader.gif';

class ForgotPasswordForm extends Component {

	renderAuthResponse() {
		if(this.props.loading) {
			return <div className="loader">
				<div className="loader-overlay"></div>
				<img src={loaderImg} className="loader-img" alt="loader" />
			</div>;
		} else if(this.props.errorMessage) {
			return <div className="error-message">{this.props.errorMessage}</div>;
		} 
	}

	handleFormSubmit(props) {
		this.props.forgotPassword(props);
  }

  render() {
		const { handleSubmit } = this.props;

		return (
		  <div className="forgot-pwd-form">
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				  <p className="form-title">Forgot Password</p>
		      <Field
		        name="email"
		        type="text"
		        component={renderInputField}
		        label="Email"
		        validate={[required, email]}
		      />
		      <Field
		        name="secret"
		        type="text"
		        component={renderInputField}
		        label="Secret"
		        validate={[required]}
		      />
		      <div>
		        <button type="submit" className="submit-btn-link">Submit</button>
		        {this.renderAuthResponse()}
		        
		        <div className="login-btn-link">
		          Back to <Link to="/login">Login</Link>
		        </div>
		      </div>

				</form>
			</div>
		);
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.authentication.loginError,
  resetLinkSent: state.authentication.resetLinkSent,
  loading: state.authentication.authLoading
});

ForgotPasswordForm = connect(
  mapStateToProps,
  actions
)(ForgotPasswordForm);

export default reduxForm({
  form: 'ForgotPasswordForm'
}, null)(ForgotPasswordForm);