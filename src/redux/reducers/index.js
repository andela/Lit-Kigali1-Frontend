import { combineReducers } from 'redux';

import forgotPassword from './forgotPasswordReducer';
import articles from './articleReducer';
import user from './userReducer';
import currentUser from './currentUserReducer';
import signUp from './signUpReducer';

const reducer = combineReducers({
  user,
  articles,
  forgotPassword,
  currentUser,
  signUp,
});

export default reducer;
