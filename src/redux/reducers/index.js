import { combineReducers } from 'redux';

import forgotPassword from './forgotPasswordReducer';
import user from './userReducer';
import currentUser from './currentUserReducer';
import signUp from './signUpReducer';
import login from './loginReducer';

const reducer = combineReducers({
  user,
  forgotPassword,
  currentUser,
  signUp,
  login,
});

export default reducer;
