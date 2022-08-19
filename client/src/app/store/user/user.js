import axios from 'axios';
import { GET_USER, fetchUser } from './userAction';
import { apiUrl } from '../../../properties';

//thunk creator

export const checkCurrentUser = (email) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/user/${email}`);
    dispatch(fetchUser(data));
  } catch (error) {
    console.log('What have you done?!', error);
  }
};

// initial state
const initialState = [];

/* REDUCER */
export default function userReducer(user = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return user;
  }
}
