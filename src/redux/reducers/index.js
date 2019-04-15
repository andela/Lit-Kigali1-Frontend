import { combineReducers } from 'redux';

import forgotPassword from './forgotPasswordReducer';
import user from './userReducer';
import currentUser from './currentUserReducer';
import login from './loginReducer';

const reducer = combineReducers({
  user,
  forgotPassword,
  currentUser,
  login,
});

export default reducer;
