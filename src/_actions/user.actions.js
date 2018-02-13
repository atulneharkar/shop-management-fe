import { history } from '../_helpers';

import {
  AUTH_USER,
  FETCH_USERS,
  FETCH_USER,
  USER_ERROR,
  USER_LOADING,
  USER_UNLOADING,
  FILE_SIZE_ERROR
} from '../_constants';

import { userService } from '../_services';

export const addUser = function(user) {
  const _user = user;
  return (dispatch) => {
    dispatch({ type: USER_LOADING });
    userService.addUser(user)
      .then(
        user => {
          if(user.errors) {
            dispatch(userError('Email Id already exist.'));
          } else {
            if(_user.avatar) {
              dispatch(uploadProfilePicture(_user.avatar));
            } else {
              dispatch({ type: USER_UNLOADING });
              dispatch({ type: AUTH_USER });
              history.push("/");
            }
          }
        },
        error => {
        	dispatch(userError('Unable to connect to server.'));
        }
      );
   };
}

export const getUserList = function() {
  return (dispatch) => {
    userService.getAllUsers()
      .then(
        users => {
          dispatch({ 
            type: FETCH_USERS,
            payload: users
          });
        },
        error => {
          dispatch(userError('Unable to connect to server.'));
        }
      );
   };
}

export const getUserById = function(userId) {
 return (dispatch) => {
    userService.getUserById(userId)
      .then(
        user => {
          dispatch({ 
            type: FETCH_USER,
            payload: user
          });
        },
        error => {
          dispatch(userError('Unable to connect to server.'));
        }
      );
   };
}

export const updateUser = function(userId, user, updateType = '') {
  const _user = user;
  return (dispatch) => {
    dispatch({ type: USER_LOADING });
    userService.updateUser(userId, user, updateType)
      .then(
        user => {
          if(_user.avatar) {
            dispatch(uploadProfilePicture(_user.avatar, updateType));
          } else if(_user.role || _user.status) {
            dispatch(getUserList());
          } else {
            dispatch({ type: USER_UNLOADING });
            history.push("/");
          }
        },
        error => {
          dispatch(userError('Unable to connect to server.'));
        }
      );
   };
}

function uploadProfilePicture(file, updateType) {
  return (dispatch) => {
    if(file[0].size > 5000000) {
      dispatch({ type: FILE_SIZE_ERROR });
    } else {
      let formData = new FormData();
      formData.append('avatar', file[0]);
      
      userService.setAvatar(formData, updateType)
        .then(
          user => {
            dispatch({ type: USER_UNLOADING });
            history.push("/");
          },
          error => {
            dispatch(userError('Unable to connect to server.'));
          }
        );
    }
  };
}

function userError(error) {
  return {
    type: USER_ERROR,
    payload: error
  }
}