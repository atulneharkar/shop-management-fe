import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../_actions';
import { required } from '../_helpers';
import { renderInputField, renderHiddenInputField } from '../_components';
import loaderImg from '../assets/images/loader.gif';

class ResetPasswordForm extends Component {
	
	componentWillMount() {
  	this.props.change('otp', this.props.match.params.otp); 
		this.props.change('userId', this.props.match.params.userId);
  }

  renderAuthResponse() {
		if(this.props.loading) {
			return <div className="loader">
				<div className="loader-overlay"></div>
				<img src={loaderImg} className="loader-img" alt="loader" />
			</div>;
		} else if(this.props.errorMessage) {
			return <div className="error-message">{this.props.errorMessage}</div>;
		} else if(this.props.resetPasswordSuccess) {
			return <div className="success-message">Password reset successfully!</div>;
		} 
	}

	handleFormSubmit(props) {
		this.props.resetPassword(props);
  }

  render() {
		const { handleSubmit } = this.props; 

		return (
			<div className="reset-pwd-form">
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				  <p className="form-title">Reset Password</p>
		      <Field
		        name="password"
		        type="password"
		        component={renderInputField}
		        label="Password"
		        validate={[required]}
		      />
		      <Field
		        name="confirmPassword"
		        type="password"
		        component={renderInputField}
		        label="Confirm Password"
		        validate={[required]}
		      />
		      <Field
		        name="otp"
		        type="hidden"
		        component={renderHiddenInputField}
		      />
		      <Field
		        name="userId"
		        type="hidden"
		        component={renderHiddenInputField}
		      />
		      <div>
		        <button type="submit" className="submit-btn-link">Reset</button>

		        <div className="login-btn-link">
		          Back to <Link to="/login">Login</Link>
		        </div>
		      </div>

		      {this.renderAuthResponse()}
				</form>
			</div>
		);
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.authentication.loginError,
  loading: state.authentication.authLoading,
  resetPasswordSuccess: state.authentication.resetPasswordSuccess,
});

ResetPasswordForm = connect(
  mapStateToProps,
  actions
)(ResetPasswordForm);

export default reduxForm({
  form: 'ResetPasswordForm'
}, null)(ResetPasswordForm);