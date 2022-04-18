// Код файла store.js
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers/rootReducer';
//import { saveToLocalStorage, loadFromLocalStorage } from 'utils/utils';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);
//const store = createStore(rootReducer, loadFromLocalStorage(), enhancer);

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
//store.subscribe(() => console.log(store.getState()));//saveToLocalStorage(store.getState()));

export default store;