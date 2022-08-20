import axios from 'axios';
import { GET_USER_EMAIL, findUserEmail } from './userActions';
import { apiUrl } from '../../../properties';

//thunk creator
export const checkCurrentEmail = (email) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/email/${email}`);

    dispatch(findUserEmail(data));
  } catch (error) {
    console.log('What have you done?!', error);
  }
};

// initial state
const initialState = [];

/* REDUCER */
export default function emailReducer(userEmail = initialState, action) {
  switch (action.type) {
    case GET_USER_EMAIL:
      return action.userEmail;
    default:
      return userEmail;
  }
}
