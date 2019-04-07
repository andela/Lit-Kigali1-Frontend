import { combineReducers } from 'redux';

import forgotPasswordReducer from './forgotPasswordReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
});

export default reducer;
