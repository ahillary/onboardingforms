import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import usersReducer from './user/users';
import usernameReducer from './user/userName';
import emailReducer from './user/userEmail';

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ axios }),
    createLogger({ collapsed: true })
  )
);

export const store = configureStore(
  {
    reducer: combineReducers({
      users: usersReducer,
      userEmail: emailReducer,
      userName: usernameReducer,
    }),
  },
  middleware
);

export default store;
export * from './user/users';
export * from './user/userEmail';
export * from './user/userName';
