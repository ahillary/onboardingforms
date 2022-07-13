import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import counterReducer from '../../features/counter/counterSlice';
import user from './user/user';

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ axios }),
    createLogger({ collapsed: true })
  )
);

export const store = configureStore(
  {
    reducer: combineReducers({
      counter: counterReducer,
      user: user,
    }),
  },
  middleware
);

export default store;
export * from './user/user';
