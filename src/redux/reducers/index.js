import { combineReducers } from 'redux';

import forgotPassword from './forgotPasswordReducer';
import articles from './articleReducer';
import user from './userReducer';
import currentUser from './currentUserReducer';
import login from './loginReducer';

const reducer = combineReducers({
  user,
  articles,
  forgotPassword,
  currentUser,
  login,
});

export default reducer;
