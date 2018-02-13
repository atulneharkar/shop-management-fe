import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  PRODUCT_ERROR,
  PRODUCT_LOADING,
  FETCH_PRODUCT_CATEGORY,
  PRODUCT_UNLOADING
} from '../_constants';

const INITIAL_STATE = { all: [] };

export const product = function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_PRODUCTS:
      return { ...state, all: action.payload, productDetail: null, productError: '', productLoading: false }

    case FETCH_PRODUCT:
      return { ...state, productDetail: action.payload, productError: '', productLoading: false }

    case FETCH_PRODUCT_CATEGORY:
      return { ...state, productDetail: null, productError: '', productLoading: false, productCategory: action.payload }

    case PRODUCT_ERROR:
      return { ...state, productDetail: null, productError: action.payload, productLoading: false };

    case PRODUCT_LOADING:
      return { ...state, productDetail: null, productError: '', productLoading: true };

    case PRODUCT_UNLOADING:
      return { ...state, productDetail: null, productError: '', productLoading: false };

    default:
      return state;
  }
}
