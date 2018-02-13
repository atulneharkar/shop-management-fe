import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../_actions';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer-wrapper clearfix">
          <p className="copy-right-text">&copy; 2018 Skillunfold.com</p>
        </div>
      </footer>
    );
  }
}

export default connect(null, actions, null, {pure:false})(Footer);