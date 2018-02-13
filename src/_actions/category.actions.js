import { history } from '../_helpers';

import {
  FETCH_CATEGORIES,
  FETCH_CATEGORY,
  CATEGORY_ERROR,
  CATEGORY_LOADING,
  CATEGORY_UNLOADING
} from '../_constants';

import { categoryService } from '../_services';

export const addCategory = function(category) {
  return (dispatch) => {
    dispatch({ type: CATEGORY_LOADING });
    categoryService.addCategory(category)
      .then(
        category => {
          dispatch({ type: CATEGORY_UNLOADING });
          history.push("/categories");
        },
        error => {
        	dispatch(categoryError('Unable to connect to server.'));
        }
      );
   };
}

export const getCategoryList = function() {
  return (dispatch) => {
    categoryService.getAllCategories()
      .then(
        categories => {
          dispatch({ 
            type: FETCH_CATEGORIES,
            payload: categories
          });
        },
        error => {
          dispatch(categoryError('Unable to connect to server.'));
        }
      );
   };
}

export const getCategoryById = function(categoryId) {
 return (dispatch) => {
    categoryService.getCategoryById(categoryId)
      .then(
        category => {
          dispatch({ 
            type: FETCH_CATEGORY,
            payload: category
          });
        },
        error => {
          dispatch(categoryError('Unable to connect to server.'));
        }
      );
   };
}

export const removeCategory = function(categoryId) {
  return (dispatch) => {
    categoryService.removeCategory(categoryId)
      .then(
        category => {
          dispatch(getCategoryList());
        },
        error => {
          dispatch(categoryError('Unable to connect to server.'));
        }
      );
   };
}

export const updateCategory = function(categoryId, category) {
  return (dispatch) => {
    dispatch({ type: CATEGORY_LOADING });
    categoryService.updateCategory(categoryId, category)
      .then(
        category => {
          dispatch({ type: CATEGORY_UNLOADING });
          history.push("/categories");
        },
        error => {
          dispatch(categoryError('Unable to connect to server.'));
        }
      );
   };
}

function categoryError(error) {
  return {
    type: CATEGORY_ERROR,
    payload: error
  }
}