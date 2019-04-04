import { combineReducers } from 'redux';

import forgotPasswordReducer from './forgotPasswordReducer';
import articleReducer from './articleReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
  user: userReducer,
  articles: articleReducer,
  forgotPassword: forgotPasswordReducer,
});

export default reducer;
