// action types
export const GET_USER = 'GET_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const INVALID_EMAIL = 'INVALID_EMAIL';

//action creators
export const fetchUser = (user) => ({ type: GET_USER, user });
export const addUser = (addAUser) => ({ type: CREATE_USER, user: addAUser });
export const putUser = (updateUser) => ({
  type: UPDATE_USER,
  user: updateUser,
});

export const invalidEmail = (email, error) => ({
  type: INVALID_EMAIL,
  error: `${error} error with ${email}`,
});
