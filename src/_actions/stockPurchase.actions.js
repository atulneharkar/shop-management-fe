import { history } from '../_helpers';
import { getProductList } from '../_actions';

import {
  FETCH_STOCKPURCHASE,
  STOCKPURCHASE_ERROR,
  STOCKPURCHASE_LOADING,
  STOCKPURCHASE_UNLOADING
} from '../_constants';

import { stockPurchaseService } from '../_services';

export const addStockPurchase = function(stockPurchase, productId) {
  return (dispatch) => {
    dispatch({ type: STOCKPURCHASE_LOADING });
    stockPurchaseService.addStockPurchase(stockPurchase, productId)
      .then(
        stockPurchase => {
          dispatch({ 
            type: STOCKPURCHASE_UNLOADING,
            payload: null
          });
          history.push("/");
        },
        error => {
        	dispatch(stockPurchaseError('Unable to connect to server.'));
        }
      );
   };
}

export const getStockPurchaseById = function(stockPurchaseId) {
 return (dispatch) => {
    stockPurchaseService.getStockPurchaseById(stockPurchaseId)
      .then(
        stockPurchase => {
          dispatch({ 
            type: FETCH_STOCKPURCHASE,
            payload: stockPurchase
          });
        },
        error => {
          dispatch(stockPurchaseError('Unable to connect to server.'));
        }
      );
   };
}

export const removeStockPurchase = function(stockPurchaseId, productId) {
  return (dispatch) => {
    stockPurchaseService.removeStockPurchase(stockPurchaseId, productId)
      .then(
        stockPurchase => {
          dispatch(getProductList());
          history.push("/");
        },
        error => {
          dispatch(stockPurchaseError('Unable to connect to server.'));
        }
      );
   };
}

export const updateStockPurchase = function(stockPurchaseId, stockPurchase) {
  return (dispatch) => {
    dispatch({ type: STOCKPURCHASE_LOADING });
    stockPurchaseService.updateStockPurchase(stockPurchaseId, stockPurchase)
      .then(
        stockPurchase => {
          dispatch({ type: STOCKPURCHASE_UNLOADING });
          history.push("/");
        },
        error => {
          dispatch(stockPurchaseError('Unable to connect to server.'));
        }
      );
   };
}

function stockPurchaseError(error) {
  return {
    type: STOCKPURCHASE_ERROR,
    payload: error
  }
}