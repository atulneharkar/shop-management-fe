import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/css/style.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { AUTH_USER, AUTH_ADMIN } from './_constants';
import reducers from './_reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
export const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('userToken');
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

// If we have a token, consider the user to be signed in
if (token) {
	(userInfo.role === 'admin') ? store.dispatch({ type: AUTH_ADMIN }) : store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
		  <App />
		</BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
