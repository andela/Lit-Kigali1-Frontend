import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from '../initialState.json';
import reducers from '../reducers/index';

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
