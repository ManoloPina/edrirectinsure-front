import * as actionTypes from '../Actions/ActionTypes';
import {updateObject} from '../../Shared/Utility';

const initialState = {
  token: null,
  id: null,
  name: null,
  email: null,
};

const authStart = (state, action) => {
  return updateObject(state, {token: null});
}

const authSuccess = (state, action) => {
  return updateObject(state, { token: action.token, id: action.id});
};

const authLogout = (state, action) => {
  return updateObject(state, {token: null, id: null});
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: authStart(state, action);
    case actionTypes.AUTH_SUCCESS: authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: authLogout(state, action);
    default: 
      return state;
  }
}

export default reducer;