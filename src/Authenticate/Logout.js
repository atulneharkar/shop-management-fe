import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../_actions';

class Logout extends Component {
	componentWillMount() {
		this.props.logout();
  }

  render() {
  	return <Redirect to="/login" />;
  }
}

export default connect(null, actions)(Logout);
