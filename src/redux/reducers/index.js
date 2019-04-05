import { combineReducers } from 'redux';

import forgotPasswordReducer from './forgotPasswordReducer';
import userReducer from './userReducer';
import signUp from './signUpReducer';

const reducer = combineReducers({
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  signUp,
});

export default reducer;
