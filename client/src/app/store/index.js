import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './user/userReducer';

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ axios }),
    createLogger({ collapsed: true })
  )
);

export const store = configureStore(
  {
    reducer: combineReducers({
      user: userReducer,
    }),
  },
  middleware
);

export default store;
export * from './user/userReducer';
