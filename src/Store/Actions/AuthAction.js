import * as actionTypes from './ActionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, id) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    id: id
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}