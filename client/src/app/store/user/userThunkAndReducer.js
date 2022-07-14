import axios from 'axios';
import history from '../../../history';
import { GET_USER, CREATE_USER, UPDATE_USER } from './userAction';
import { fetchUser, addUser, putUser, invalidEmail } from './userAction';
import { apiUrl } from '../../../properties';

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
      res = await axios.get(`${apiUrl}/api/users/${id}`);
      dispatch(fetchUser(res.data || defaultUser));
    } catch (error) {
      console.error(
        `could not retrieve database user info to continue with signup. Error: ${error}`
      );
    }
  };

// form one
export const addUserFormOne =
  (form, email, username, password) => async (dispatch) => {
    let res;
    try {
      // if (!email.includes('@')) {
      //   dispatch(invalidEmail(email, 'invalid email error'));
      // } else {
      res = await axios.post(`${apiUrl}/api/users/`, {
        email,
        username,
        password,
      });
      dispatch(addUser(res.data || defaultUser));
      history.push('/fromTwo');
      // }
    } catch (addError) {
      console.error(
        `Could not add to database, form 1 thunk first catch error: ${addError}`
      );
    }
    try {
      dispatch(fetchUser(res.data));
    } catch (dispatchOrHistoryErr) {
      console.error(`form 1 thunk: ${dispatchOrHistoryErr}`);
    }
  };

// form two
export const addUserFormTwo =
  (form, id, firstName, lastName, number) => async (dispatch) => {
    let res;
    try {
      res = await axios.put(`${apiUrl}/api/users/${id}`, form, {
        firstName,
        lastName,
        number,
      });
      // } catch (updateError) {
      //   console.error(`form 2 thunk first catch: ${updateError}`);
      //   return dispatch(putUser({ error: updateError }));
      // }
      // try {
      dispatch(putUser(res.data));
      // history.push('/home');
    } catch (dispatchOrHistoryErr) {
      console.error(`form 2 thunk: ${dispatchOrHistoryErr}`);
    }
  };

// form three
export const addUserFormThree =
  (form, id, streetAddress, city, state, zipCode) => async (dispatch) => {
    let res;
    try {
      res = await axios.put(`${apiUrl}/api/users/${id}`, form, {
        streetAddress,
        city,
        state,
        zipCode,
      });
      // } catch (updateError) {
      //   console.error(`form 3 thunk first catch: ${updateError}`);
      //   return dispatch(putUser({ error: updateError }));
      // }
      // try {
      dispatch(putUser(res.data));
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
