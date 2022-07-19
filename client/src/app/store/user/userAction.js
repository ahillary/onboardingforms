// action types
export const CREATE_USER = 'CREATE_USER';
export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';
export const UPDATE_USER = 'UPDATE_USER';

//action creators
export const addUser = (addThisUser) => ({
  type: CREATE_USER,
  user: addThisUser,
});
export const fetchUser = (findThisUser) => ({
  type: GET_USER,
  user: findThisUser,
});
export const fetchUsers = (AllUsers) => ({
  type: GET_USERS,
  user: AllUsers,
});
export const putUser = (updateThisUser) => ({
  type: UPDATE_USER,
  user: updateThisUser,
});
