import {
  FETCH_STOCKSOLDS,
  FETCH_STOCKSOLD,
  STOCKSOLD_ERROR,
  STOCKSOLD_LOADING,
  STOCKSOLD_UNLOADING
} from '../_constants';

const INITIAL_STATE = { all: [] };

export const stockSold = function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_STOCKSOLDS:
      return { ...state, all: action.payload, stockSoldDetail: null, stockSoldError: '', stockSoldLoading: false }

    case FETCH_STOCKSOLD:
      return { ...state, stockSoldDetail: action.payload, stockSoldError: '', stockSoldLoading: false }

    case STOCKSOLD_ERROR:
      return { ...state, stockSoldDetail: null, stockSoldError: action.payload, stockSoldLoading: false };

    case STOCKSOLD_LOADING:
      return { ...state, stockSoldDetail: null, stockSoldError: '', stockSoldLoading: true };

    case STOCKSOLD_UNLOADING:
      return { ...state, stockSoldDetail: null, stockSoldError: '', stockSoldLoading: false };

    default:
      return state;
  }
}
