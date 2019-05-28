import * as actionTypes from './ActionTypes';

export const authStart = () => {
  
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const email = localStorage.getItem('email');
  const name = localStorage.getItem('name');

  return {
    type: actionTypes.AUTH_START,
    token: token,
    id: id,
    email: email,
    name: name
  }
};

export const authSuccess = (token, id, email, name) => {
  
  localStorage.setItem('token', token);
  localStorage.setItem('id', id);
  localStorage.setItem('email', email);
  localStorage.setItem('name', name);
  
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    id: id,
    email: email
  }

};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};