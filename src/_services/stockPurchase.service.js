import 'whatwg-fetch';

import { setHeader } from '../_helpers';
import { SERVER_URL } from '../_constants';

export const stockPurchaseService = {
    addStockPurchase,
    updateStockPurchase,
    getStockPurchaseById,
    removeStockPurchase,
};

function addStockPurchase(stockPurchase, productId) {
  return fetch(`${SERVER_URL}/stockPurchase/create/${productId}`, setHeader('POST', stockPurchase, true)).then((response) => response.json());
}

function updateStockPurchase(stockPurchaseId, stockPurchase) {
  return fetch(`${SERVER_URL}/stockPurchase/${stockPurchaseId}`, setHeader('PUT', stockPurchase, true)).then((response) => response.json());
}

function getStockPurchaseById(stockPurchaseId) {
  return fetch(`${SERVER_URL}/stockPurchase/${stockPurchaseId}`, setHeader('GET', null, true)).then((response) => response.json());
}

function removeStockPurchase(stockPurchaseId, productId) {
  return fetch(`${SERVER_URL}/stockPurchase/${stockPurchaseId}/${productId}`, setHeader('DELETE', null, true)).then((response) => response.json());
}