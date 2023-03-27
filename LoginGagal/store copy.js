import { legacy_createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './Reducers';

const middlewares = [thunk];
export default legacy_createStore(reducer, applyMiddleware(...middlewares));
