import 'whatwg-fetch';

import { setHeader } from '../_helpers';
import { SERVER_URL } from '../_constants';

export const userService = {
    addUser,
    updateUser,
    getAllUsers,
    getUserById,
    setAvatar
};

function addUser(user) {
  return fetch(`${SERVER_URL}/user/create`, setHeader('POST', user)).then((response) => response.json());
}

function updateUser(userId, user, updateType) {
  return fetch(`${SERVER_URL}/user/${userId}`, setHeader('PUT', user, true)).then((response) => {
    return response.json();
  }).then((userInfo) => {
    if(updateType === 'self') {
      saveUserDataToLocalStorage(userInfo);
    }
    return userInfo;
  });
}

function getAllUsers() {
  return fetch(`${SERVER_URL}/user/list/all`, setHeader('GET', null, true)).then((response) => response.json());
}

function getUserById(userId) {
  return fetch(`${SERVER_URL}/user/${userId}`, setHeader('GET', null, true)).then((response) => response.json());
}

function setAvatar(data, updateType) {
  return fetch(`${SERVER_URL}/user/avatar`, setHeader('POST', data, true, true)).then((response) => {
    return response.json();
  }).then((userInfo) => {
    if(updateType === 'self') {
      saveUserDataToLocalStorage(userInfo);
    }
    return userInfo;
  });
}

function saveUserDataToLocalStorage(userInfo) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}