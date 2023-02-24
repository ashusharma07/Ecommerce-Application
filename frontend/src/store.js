// this is the store house of data in redux.

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { productListReducer } from "./reducers/productReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  productList: productListReducer,
});

const initialState = {};

// thunk is used as a middleware of for nested function.
const middleware = [thunk];

// create store helps in creating the store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
