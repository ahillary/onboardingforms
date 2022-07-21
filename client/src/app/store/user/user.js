import axios from 'axios';
import { GET_USER, fetchUser } from './userAction';
import { apiUrl } from '../../../properties';

//thunk creator
export const currentUser = (username) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/users/${username}`);
    dispatch(fetchUser(data));
  } catch (error) {
    console.log('What have you done?!', error);
  }
};

// while it would be ideal to use the user.id to find a user, in the edge case that more than one individual is creating an account simutaneously it would mess up the process with this function as written:
// export const findThem = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get(`${apiUrl}/api/user`);
//     dispatch(fetchUser(data));
//   } catch (error) {
//     console.log('What have you done?!', error);
//   }
// };

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
