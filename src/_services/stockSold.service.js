import 'whatwg-fetch';

import { setHeader } from '../_helpers';
import { SERVER_URL } from '../_constants';

export const stockSoldService = {
    addStockSold,
    updateStockSold,
    getStockSoldById,
    removeStockSold,
};

function addStockSold(stockSold, productId) {
  return fetch(`${SERVER_URL}/stockSold/create/${productId}`, setHeader('POST', stockSold, true)).then((response) => response.json());
}

function updateStockSold(stockSoldId, stockSold) {
  return fetch(`${SERVER_URL}/stockSold/${stockSoldId}`, setHeader('PUT', stockSold, true)).then((response) => response.json());
}

function getStockSoldById(stockSoldId) {
  return fetch(`${SERVER_URL}/stockSold/${stockSoldId}`, setHeader('GET', null, true)).then((response) => response.json());
}

function removeStockSold(stockSoldId, productId) {
  return fetch(`${SERVER_URL}/stockSold/${stockSoldId}/${productId}`, setHeader('DELETE', null, true)).then((response) => response.json());
}