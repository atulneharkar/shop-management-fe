import {
  FETCH_CATEGORIES,
  FETCH_CATEGORY,
  CATEGORY_ERROR,
  CATEGORY_LOADING,
  CATEGORY_UNLOADING
} from '../_constants';

const INITIAL_STATE = { all: [] };

export const category = function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CATEGORIES:
      return { ...state, all: action.payload, categoryDetail: null, categoryError: '', categoryLoading: false }

    case FETCH_CATEGORY:
      return { ...state, categoryDetail: action.payload, categoryError: '', categoryLoading: false }

    case CATEGORY_ERROR:
      return { ...state, categoryDetail: null, categoryError: action.payload, categoryLoading: false };

    case CATEGORY_LOADING:
      return { ...state, categoryDetail: null, categoryError: '', categoryLoading: true };

    case CATEGORY_UNLOADING:
      return { ...state, categoryDetail: null, categoryError: '', categoryLoading: false };

    default:
      return state;
  }
}
