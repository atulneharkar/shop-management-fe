import 'whatwg-fetch';

import { setHeader } from '../_helpers';
import { SERVER_URL } from '../_constants';

export const productService = {
    addProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    setProductImage,
    removeProduct,
    getProductByCategory,
    getProductByDate
};

function addProduct(product) {
  return fetch(`${SERVER_URL}/product/create`, setHeader('POST', product, true)).then((response) => response.json());
}

function updateProduct(productId, product) {
  return fetch(`${SERVER_URL}/product/${productId}`, setHeader('PUT', product, true)).then((response) => response.json());
}

function getAllProducts() {
  return fetch(`${SERVER_URL}/product/list/all`, setHeader('GET', null, true)).then((response) => response.json());
}

function getProductByCategory(category) {
  return fetch(`${SERVER_URL}/product/list/${category}`, setHeader('GET', null, true)).then((response) => response.json());
}

function getProductByDate(startDate, endDate) {
  return fetch(`${SERVER_URL}/product/list/${startDate}/${endDate}`, setHeader('GET', null, true)).then((response) => response.json());
}

function getProductById(productId) {
  return fetch(`${SERVER_URL}/product/${productId}`, setHeader('GET', null, true)).then((response) => response.json());
}

function removeProduct(productId) {
  return fetch(`${SERVER_URL}/product/${productId}`, setHeader('DELETE', null, true)).then((response) => response.json());
}

function setProductImage(data, productId) {
  return fetch(`${SERVER_URL}/product/productImage/${productId}`, setHeader('POST', data, true, true)).then((response) => response.json());
}