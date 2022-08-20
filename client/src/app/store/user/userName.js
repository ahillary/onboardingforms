import axios from 'axios';
import { GET_USER_USERNAME, findUserUsername } from './userActions';
import { apiUrl } from '../../../properties';

// thunk creator
export const checkCurrentUsername = (username) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/username/${username}`);

    dispatch(findUserUsername(data));
  } catch (error) {
    console.log('What have you done?!', error);
  }
};

// initial state
const initialState = [];

/* REDUCER */
export default function usernameReducer(userName = initialState, action) {
  switch (action.type) {
    case GET_USER_USERNAME:
      return action.userName;
    default:
      return userName;
  }
}
