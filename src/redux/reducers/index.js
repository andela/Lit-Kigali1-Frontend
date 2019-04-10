import { combineReducers } from 'redux';

import forgotPassword from './forgotPasswordReducer';
import user from './userReducer';
import currentUser from './currentUserReducer';
import signUp from './signUpReducer';

const reducer = combineReducers({
  user,
  forgotPassword,
  currentUser,
  signUp,
});

export default reducer;
