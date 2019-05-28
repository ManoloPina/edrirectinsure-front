import * as actionTypes from '../Actions/ActionTypes';
import {updateObject} from '../../Shared/Utility';

const initialState = {
  token: null,
  id: null,
  email: null,
};

const authStart = (state, action) => {
  return updateObject(state, {token: action.token, id: action.id, email: action.email, name: action.name});
}

const authSuccess = (state, action) => {
  return updateObject(state, { token: action.token, id: action.id, email: action.email, name: action.name});
};

const authLogout = (state, action) => {
  
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('id');
  localStorage.removeItem('name');

  return updateObject(state, {token: null, id: null, email: null, name: null});
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: 
      return state;
  }
};

export default authReducer;