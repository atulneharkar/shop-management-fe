import { history } from '../_helpers';

import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  PRODUCT_ERROR,
  PRODUCT_LOADING,
  PRODUCT_UNLOADING,
  FETCH_PRODUCT_CATEGORY
} from '../_constants';

import { productService, categoryService } from '../_services';

export const addProduct = function(product) {
  const _product = product;
  return (dispatch) => {
    dispatch({ type: PRODUCT_LOADING });
    productService.addProduct(product)
      .then(
        product => {
          if(_product.avatar) {
            dispatch(uploadProductImage(_product.avatar, product._id));
          } else {
            dispatch({ type: PRODUCT_UNLOADING });
            history.push("/products");
          }
        },
        error => {
        	dispatch(productError('Unable to connect to server.'));
        }
      );
   };
}

export const getProductList = function() {
  return (dispatch) => {
    productService.getAllProducts()
      .then(
        products => {
          dispatch({ 
            type: FETCH_PRODUCTS,
            payload: products
          });
        },
        error => {
          dispatch(productError('Unable to connect to server.'));
        }
      );
   };
}

export const getProductByCategory = function(category) {
  return (dispatch) => {
    productService.getProductByCategory(category)
      .then(
        products => {
          dispatch({ 
            type: FETCH_PRODUCTS,
            payload: products
          });
        },
        error => {
          dispatch(productError('Unable to connect to server.'));
        }
      );
   };
}

export const getProductByDate = function(startDate, endDate) {
  return (dispatch) => {
    productService.getProductByDate(startDate, endDate)
      .then(
        products => {
          dispatch({ 
            type: FETCH_PRODUCTS,
            payload: products
          });
        },
        error => {
          dispatch(productError('Unable to connect to server.'));
        }
      );
   };
}

export const getProductById = function(productId) {
 return (dispatch) => {
    productService.getProductById(productId)
      .then(
        product => {
          dispatch({ 
            type: FETCH_PRODUCT,
            payload: product
          });
        },
        error => {
          dispatch(productError('Unable to connect to server.'));
        }
      );
   };
}

export const removeProduct = function(productId) {
  return (dispatch) => {
    productService.removeProduct(productId)
      .then(
        product => {
          dispatch(getProductList());
        },
        error => {
          dispatch(productError('Unable to connect to server.'));
        }
      );
   };
}

export const updateProduct = function(productId, product) {
  const _product = product;
  return (dispatch) => {
    dispatch({ type: PRODUCT_LOADING });
    productService.updateProduct(productId, product)
      .then(
        product => {
          if(_product.avatar) {
            dispatch(uploadProductImage(_product.avatar, productId));
          } else {
            dispatch({ type: PRODUCT_UNLOADING });
            history.push("/products");
          }
        },
        error => {
          dispatch(productError('Unable to connect to server.'));
        }
      );
   };
}

export const getProductCategory = function() {
  return (dispatch) => {
    categoryService.getAllCategories()
      .then(
        categories => {
          let formattedCategories = [];
          for(let i in categories) {
            formattedCategories.push({
              value: categories[i].name,
              label: categories[i].name
            });
          }
          dispatch({ 
            type: FETCH_PRODUCT_CATEGORY,
            payload: formattedCategories
          }); 
        },
        error => {
          dispatch(productError('Unable to connect to server.'));
        }
      );
   };
}

function uploadProductImage(file, productId) {
  return (dispatch) => {
    let formData = new FormData();
    formData.append('avatar', file[0]);
    
    productService.setProductImage(formData, productId)
      .then(
        product => {
          dispatch({ type: PRODUCT_UNLOADING });
          history.push("/products");
        },
        error => {
          dispatch(productError('Unable to connect to server.'));
        }
      );
  };
}

function productError(error) {
  return {
    type: PRODUCT_ERROR,
    payload: error
  }
}