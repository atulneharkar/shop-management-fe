import 'whatwg-fetch';

import { setHeader } from '../_helpers';
import { SERVER_URL } from '../_constants';

export const authenticationService = {
  authenticateUser,
  forgotPassword,
  resetPassword
};

function authenticateUser(user, loginType) {
  const loginURL = (loginType === 'local') ? `${SERVER_URL}/user/login` : `${SERVER_URL}/user/login-social`;
  return fetch(loginURL, setHeader('POST', user)).then((response) => {
    const token = response.headers.get('x-auth');
    if(token) {
      localStorage.setItem('userToken', token);
    }
    return response.json();
  }).then((userInfo) => {
      if(userInfo.role === 'admin') {
       localStorage.setItem('userInfo', JSON.stringify(userInfo));
      } else {
        localStorage.removeItem('userToken');
      }
      return userInfo;
  });
}

function forgotPassword(user) {
  return fetch(`${SERVER_URL}/user/forgot-password`, setHeader('POST', user)).then((response) => response.json());
}

function resetPassword(user) {
  return fetch(`${SERVER_URL}/user/reset-password`, setHeader('POST', user)).then((response) => response.json());
}