import 'whatwg-fetch';

import { setHeader } from '../_helpers';
import { SERVER_URL } from '../_constants';

export const categoryService = {
    addCategory,
    updateCategory,
    getAllCategories,
    getCategoryById,
    removeCategory,
};

function addCategory(category) {
  return fetch(`${SERVER_URL}/category/create`, setHeader('POST', category, true)).then((response) => response.json());
}

function updateCategory(categoryId, category) {
  return fetch(`${SERVER_URL}/category/${categoryId}`, setHeader('PUT', category, true)).then((response) => response.json());
}

function getAllCategories() {
  return fetch(`${SERVER_URL}/category/list/all`, setHeader('GET', null, true)).then((response) => response.json());
}

function getCategoryById(categoryId) {
  return fetch(`${SERVER_URL}/category/${categoryId}`, setHeader('GET', null, true)).then((response) => response.json());
}

function removeCategory(categoryId) {
  return fetch(`${SERVER_URL}/category/${categoryId}`, setHeader('DELETE', null, true)).then((response) => response.json());
}