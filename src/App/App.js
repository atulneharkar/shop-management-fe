import React, { Component } from 'react';
import { Router } from 'react-router-dom';

import { history } from '../_helpers';
import Routes from '../routes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class App extends Component {
  render() {
    return (
    	<Router history={history}>
	    	<div>
		    	<Header />
		      <Routes />
		      <Footer />
	      </div>
      </Router>
    );
  }
}

export default App;
