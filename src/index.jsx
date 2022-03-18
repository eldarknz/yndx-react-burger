import React from 'react';
import ReactDOM from 'react-dom';

import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';

import App from './components/App/App';
import './styles/globals.css';

import reportWebVitals from './reportWebVitals';

// Усилитель 1
const actionLogger = store => next => action => {
  console.log(`${new Date().toLocaleString()} | Action: ${JSON.stringify(action)}` );
  return next(action);
};

// Усилитель 2
const errorLogger = store => next => action => {
  if (action.type === 'SOMETHING_FAILED') {
        console.error(`Произошла ошибка: ${JSON.stringify(action)}`)
    }
  return next(action);
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(actionLogger, errorLogger, thunk));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
