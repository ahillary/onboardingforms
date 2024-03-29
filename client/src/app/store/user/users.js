import axios from 'axios';
import history from '../../../history';
import {
  CREATE_USER,
  GET_USERS,
  UPDATE_USER,
  addUser,
  fetchUsers,
  putUser,
} from './userActions';
import { apiUrl } from '../../../properties';

/***** history ****/

//thunk creators

export const allUsers = () => async (dispatch) => {
  let res;
  try {
    res = await axios.get(`${apiUrl}/api/users`);
    dispatch(fetchUsers(res.data));
  } catch (error) {
    console.error(
      `Could not retrieve database info, while getting all users. Error: ${error}`
    );
  }
};

//confirmation
export const createUser =
  (
    email,
    username,
    password,
    firstName,
    lastName,
    number,
    streetAddress,
    city,
    state,
    zipCode
  ) =>
  async (dispatch) => {
    let res;
    console.log('see here');

    try {
      res = await axios.post(`${apiUrl}/api/user`, {
        email,
        username,
        password,
        firstName,
        lastName,
        number,
        streetAddress,
        city,
        state,
        zipCode,
      });
      dispatch(addUser(res.data));
    } catch (addError) {
      console.error(
        `Could not create user in database, thunk catch error: ${addError}`
      );
    }
  };

// form one
export const addUserFormOne =
  (email, username, password) => async (dispatch) => {
    let res;
    try {
      res = await axios.post(`${apiUrl}/api/user`, {
        email,
        username,
        password,
      });
      dispatch(addUser(res.data));

      // history.push('/fromTwo');
    } catch (addError) {
      console.error(
        `Could not add to database, form 1 thunk first catch error: ${addError}`
      );
    }
  };

// form two
export const addUserFormTwo =
  (email, firstName, lastName, number) => async (dispatch) => {
    let res;
    try {
      res = await axios.put(`${apiUrl}/api/user/${email}`, {
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
  (email, streetAddress, city, state, zipCode) => async (dispatch) => {
    let res;
    try {
      res = await axios.put(`${apiUrl}/api/user/${email}`, {
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

// initial state
const initialState = [];

/* REDUCER */
const usersReducer = (users = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      const list = action.users;
      return list;

    case CREATE_USER:
      const newList = [...users, action.user];
      return newList;

    case UPDATE_USER:
      return action.user;

    default:
      return users;
  }
};

//export reducer
export default usersReducer;
