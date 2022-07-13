import axios from 'axios';
import history from '../../../history';
import { GET_USER, CREATE_USER, UPDATE_USER } from './userAction';
import { setUser, addUser, putUser, invalidEmail } from './userAction';

/*
history
*/

// initial state
export const defaultUser = {};

//thunk creators
export const currentUser =
  (id) =>
  async (dispatch, getState, { axios }) => {
    let res;
    try {
      res = await axios.get(`/api/users/${id}`);
      dispatch(setUser(res.data || defaultUser));
    } catch (error) {
      console.error(
        `could not retrieve database user info to continue with signup. Error: ${error}`
      );
    }
  };

// form one
export const addSignUpFormOne =
  (email, username, password) =>
  async (dispatch, getState, { axios }) => {
    let res;
    try {
      if (!email.includes('@')) {
        dispatch(invalidEmail(email, 'invalid email error'));
      } else {
        res = await axios.post(`/api/users/`, {
          email,
          username,
          password,
        });
        dispatch(addUser(res.data || defaultUser));
        history.push('/fromTwo');
      }
    } catch (addError) {
      console.error(
        `Could not add to database, thunk threw this error: ${addError}`
      );
    }

    try {
      dispatch(setUser(res.data));
    } catch (dispatchOrHistoryErr) {
      console.error(`form 1 thunk: ${dispatchOrHistoryErr}`);
    }
  };

// form two
export const addSignUpFormTwo =
  (form, id, firstName, lastName, number) =>
  async (dispatch, getState, { axios }) => {
    let res;
    try {
      res = await axios.put(`/api/users/${form}`, id, {
        firstName,
        lastName,
        number,
      });
    } catch (updateError) {
      return dispatch(setUser({ error: updateError }));
    }
    try {
      dispatch(putUser(res.data));
      // history.push('/home');
    } catch (dispatchOrHistoryErr) {
      console.error(`form 2 thunk: ${dispatchOrHistoryErr}`);
    }
  };

// form three
export const addSignUpFormThree =
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
      return dispatch(putUser({ error: addError }));
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
