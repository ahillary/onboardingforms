// action types
export const CREATE_USER = 'CREATE_USER';
export const GET_USER = 'GET_USER';
export const GET_USER_EMAIL = 'GET_USER_EMAIL';
export const GET_USER_USERNAME = 'GET_USER_USERNAME';
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
export const fetchUsers = (ListAllUsers) => ({
  type: GET_USERS,
  users: ListAllUsers,
});
export const findUserEmail = (foundUser) => ({
  type: GET_USER_EMAIL,
  userEmail: foundUser,
});
export const findUserUsername = (foundUser) => ({
  type: GET_USER_USERNAME,
  userName: foundUser,
});
export const putUser = (updateThisUser) => ({
  type: UPDATE_USER,
  user: updateThisUser,
});
