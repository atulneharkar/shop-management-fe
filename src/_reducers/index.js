import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { authentication } from './authentication.reducer';
import { user } from './user.reducer';
import { product } from './product.reducer';
import { category } from './category.reducer';
import { stockPurchase } from './stockPurchase.reducer';
import { stockSold } from './stockSold.reducer';

const rootReducer = combineReducers({
	form,
  authentication,
  user,
  product,
  category,
  stockPurchase,
  stockSold
});

export default rootReducer;