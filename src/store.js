import {createStore, compose, applyMiddleware} from 'redux';
import trunk from 'redux-thunk';

import rootReducer from './reducers.js';

let composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleware = composeEnhancer(applyMiddleware(trunk));

let store = createStore(rootReducer, middleware );

export default store;