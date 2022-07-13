import axios from 'axios';
// import history from '../../history';
import {
  GET_USER,
  CREATE_USER,
  UPDATE_USER,
  INVALID_EMAIL,
} from './userAction';
import { setUser, addUser, putUser, invalidEmail } from './userAction';

/*
history

thunk:
axios.get('/auth/me');
*/

// initial state
export const defaultUser = {};

//thunk creators
export const currentUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(setUser(res.data || defaultUser));
  } catch (error) {
    console.error(
      `could not retrieve database info to continue. Error: ${error}`
    );
  }
};
//FOR REFERENCE to authSignUpFormOne
// export const addUser =
//   (user) =>
//   async (dispatch, getState, { axios }) => {
//     const res = await axios.post('/api/users/', user);
//     dispatch(addUser(res.data || defaultUser));
//   };

// form one
export const addSignUpFormOne =
  (form, email, username, password) =>
  async (dispatch, getState, { axios }) => {
    let res;
    try {
      if (!email.includes('@')) {
        dispatch(invalidEmail(email, 'invalid email error'));
      } else {
        res = await axios.post(`/auth/users/${form}`, {
          email,
          username,
          password,
        });
        dispatch(addUser(res.data || defaultUser));
      }
    } catch (addError) {
      console.error(
        `Could not add to database, thunk threw this error: ${addError}`
      );
    }

    try {
      dispatch(setUser(res.data));
      // history.push('/home');
    } catch (dispatchOrHistoryErr) {
      console.error(`form 1 thunk: ${dispatchOrHistoryErr}`);
    }
  };

// form two
export const authSignUpFormTwo =
  (form, id, firstName, lastName, number) => async (dispatch) => {
    let res;
    try {
      res = await axios.post(`/auth/users/${form}`, id, {
        firstName,
        lastName,
        number,
      });
    } catch (updateError) {
      return dispatch(setUser({ error: updateError }));
    }
    try {
      dispatch(setUser(res.data));
      // history.push('/home');
    } catch (dispatchOrHistoryErr) {
      console.error(`form 2 thunk: ${dispatchOrHistoryErr}`);
    }
  };

// form three
export const authSignUpFormThree =
  (form, street, city, state, zip) => async (dispatch) => {
    let res;
    try {
      res = await axios.post(`/auth/${form}`, {
        street,
        city,
        state,
        zip,
      });
    } catch (addError) {
      return dispatch(setUser({ error: addError }));
    }

    try {
      dispatch(setUser(res.data));
      // history.push('/home');
    } catch (dispatchOrHistoryErr) {
      console.error(`form 3 thunk: ${dispatchOrHistoryErr}`);
    }
  };

/* REDUCER */
export default function user(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case CREATE_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
