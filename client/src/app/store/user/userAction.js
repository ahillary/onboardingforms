// action types
export const GET_USER = 'GET_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const INVALID_EMAIL = 'INVALID_EMAIL';

//action creators
export const fetchUser = (findThisUser) => ({
  type: GET_USER,
  user: findThisUser,
});
export const addUser = (addThisUser) => ({
  type: CREATE_USER,
  user: addThisUser,
});
export const putUser = (updateThisUser) => ({
  type: UPDATE_USER,
  user: updateThisUser,
});

export const invalidEmail = (email, error) => ({
  type: INVALID_EMAIL,
  error: `${error} error with ${email}`,
});
