import {
  FETCH_STOCKPURCHASES,
  FETCH_STOCKPURCHASE,
  STOCKPURCHASE_ERROR,
  STOCKPURCHASE_LOADING,
  STOCKPURCHASE_UNLOADING
} from '../_constants';

const INITIAL_STATE = { all: [] };

export const stockPurchase = function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_STOCKPURCHASES:
      return { ...state, all: action.payload, stockPurchaseDetail: null, stockPurchaseError: '', stockPurchaseLoading: false }

    case FETCH_STOCKPURCHASE:
      return { ...state, stockPurchaseDetail: action.payload, stockPurchaseError: '', stockPurchaseLoading: false }

    case STOCKPURCHASE_ERROR:
      return { ...state, stockPurchaseDetail: null, stockPurchaseError: action.payload, stockPurchaseLoading: false };

    case STOCKPURCHASE_LOADING:
      return { ...state, stockPurchaseDetail: null, stockPurchaseError: '', stockPurchaseLoading: true };

    case STOCKPURCHASE_UNLOADING:
      return { ...state, stockPurchaseDetail: null, stockPurchaseError: '', stockPurchaseLoading: false };

    default:
      return state;
  }
}
