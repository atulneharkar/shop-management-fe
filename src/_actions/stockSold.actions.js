import { history } from '../_helpers';
import { getProductList } from '../_actions';

import {
  FETCH_STOCKSOLD,
  STOCKSOLD_ERROR,
  STOCKSOLD_LOADING,
  STOCKSOLD_UNLOADING
} from '../_constants';

import { stockSoldService } from '../_services';

export const addStockSold = function(stockSold, productId) {
  return (dispatch) => {
    dispatch({ type: STOCKSOLD_LOADING });
    stockSoldService.addStockSold(stockSold, productId)
      .then(
        stockSold => {
          dispatch({ 
            type: STOCKSOLD_UNLOADING,
            payload: null
          });
          history.push("/");
        },
        error => {
        	dispatch(stockSoldError('Unable to connect to server.'));
        }
      );
   };
}

export const getStockSoldById = function(stockSoldId) {
 return (dispatch) => {
    stockSoldService.getStockSoldById(stockSoldId)
      .then(
        stockSold => {
          dispatch({ 
            type: FETCH_STOCKSOLD,
            payload: stockSold
          });
        },
        error => {
          dispatch(stockSoldError('Unable to connect to server.'));
        }
      );
   };
}

export const removeStockSold = function(stockSoldId, productId) {
  return (dispatch) => {
    stockSoldService.removeStockSold(stockSoldId, productId)
      .then(
        stockSold => {
          dispatch(getProductList());
          history.push("/");
        },
        error => {
          dispatch(stockSoldError('Unable to connect to server.'));
        }
      );
   };
}

export const updateStockSold = function(stockSoldId, stockSold) {
  return (dispatch) => {
    dispatch({ type: STOCKSOLD_LOADING });
    stockSoldService.updateStockSold(stockSoldId, stockSold)
      .then(
        stockSold => {
          dispatch({ type: STOCKSOLD_UNLOADING });
          history.push("/");
        },
        error => {
          dispatch(stockSoldError('Unable to connect to server.'));
        }
      );
   };
}

function stockSoldError(error) {
  return {
    type: STOCKSOLD_ERROR,
    payload: error
  }
}