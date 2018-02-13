import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_LINK_SENT,
  AUTH_ADMIN,
  AUTH_UNLOADING
} from '../_constants';

export const authentication = function(state = {}, action) {
  switch(action.type) {
    case AUTH_ADMIN:
      return { ...state, isAdmin: true, isAuthenticated: true, authLoading: false, resetPasswordSuccess: false, resetLinkSent: false, loginError: '' }

    case AUTH_USER:
      return { ...state, isAdmin: false, isAuthenticated: true, authLoading: false, resetPasswordSuccess: false, resetLinkSent: false, loginError: '' }

    case UNAUTH_USER:
      return { ...state, isAdmin: false, isAuthenticated: false, authLoading: false, resetPasswordSuccess: false, resetLinkSent: false, loginError: '' }

    case AUTH_ERROR:
      return { ...state, isAdmin: false, isAuthenticated: false, authLoading: false, resetPasswordSuccess: false, resetLinkSent: false, loginError: action.payload };

    case AUTH_LOADING:
      return { ...state, isAdmin: false, isAuthenticated: false, authLoading: true, resetPasswordSuccess: false, resetLinkSent: false, loginError: '' }

    case AUTH_UNLOADING:
      return { ...state, isAdmin: false, isAuthenticated: false, authLoading: false, resetPasswordSuccess: false, resetLinkSent: false, loginError: '' }

    case RESET_PASSWORD_SUCCESS:
      return { ...state, isAdmin: false, isAuthenticated: false, authLoading: false, resetPasswordSuccess: true, resetLinkSent: false, loginError: '' }

    case RESET_LINK_SENT:
      return { ...state, isAdmin: false, isAuthenticated: false, authLoading: false, resetPasswordSuccess: false, resetLinkSent: true, loginError: '' }

    default:
      return state;
  }
}